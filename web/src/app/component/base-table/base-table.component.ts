import { Component, OnInit, AfterViewInit, QueryList, ViewChildren, Inject, OnDestroy, Input, ViewChild } from '@angular/core';
import { QuoteRecord } from '../../model/quoteRecord';
import { NgbdSortableHeaderDirective, SortEvent, compare } from '../../directive/sortable/sortableheader.component';
import { Color } from 'ng2-charts';
import { EventListenerService } from '../../service/eventListenerService';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasicRestService } from 'src/app/service/basic-rest.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TableAnimations} from "../../animations"
import { ActivatedRoute } from '@angular/router';
import { delay } from "rxjs/operators";

import {
  ChartComponent,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexStates,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  states: ApexStates;
  grid: ApexGrid;
};

@Component({
  selector: 'base-table',
  templateUrl: './base-table.component.html',
  animations: [TableAnimations.animations]
})
export class BaseTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() url: string = "/stream/quotes"
  @Input() initDelay: number = 0
  @Input() paging: boolean = true
  @Input() stream: boolean = true
  apiURL = environment.apiUrl;

  @ViewChild("chart") chart: ChartComponent;
  public apexChartOptions: Partial<ChartOptions>;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  quoteRecords: QuoteRecord[] = [];
  init: boolean;
  mouseover: boolean;
  showDialog: boolean;
  data = this.quoteRecords;
  subscription: Subscription

  constructor(private http: HttpClient, private quoteService: EventListenerService, private dialog: MatDialog, private route: ActivatedRoute) {
    this.apexChartOptions = {
      chart: {
        type: "candlestick",
        height: 'auto',
        width: '100px',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        },
        animations: {
          enabled: false,
        }
      },
      xaxis: {
        tooltip: {
          enabled: false
        },
        labels: {
          show: false,
          maxHeight: 1,
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        labels: {
          show: false
        }
      },
      tooltip: {
        enabled: false,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
            highlightDataSeries: false,
        },
        x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
        },
        y: {
            formatter: undefined,
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        z: {
            formatter: undefined,
            title: 'Size: '
        },
        marker: {
            show: false,
        },
        items: {
           display: 'flex',
        },
        fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: -1000,
            offsetY: -100,
        },
    },
      grid: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 15
         }
      }
    };
  }

  concat(element: QuoteRecord[]) {
    element.forEach(it => {
      if (this.quoteRecords.findIndex(x => x.symbol === it.symbol) == -1)
        it.historicalMarketClose = [{ data: it.chartData[0].data.map(x => x.close) }]
        var i: number = 0
        var tst: [number, number[]][] = []
        it.chartData[0].data.forEach(element => {
          tst.push([++i, [element.open, element.high, element.low, element.close]])
        });
        it.apexCandleStickChartSeries = [
          {
            name: "candle",
            data: tst
          }
        ]
        this.quoteRecords.push(it);
    })
  }

  update(element: QuoteRecord) {
    const index = this.quoteRecords.findIndex(x => x.symbol === element.symbol)
    if(index > -1){
      this.quoteRecords[index].price = element.price
      this.quoteRecords[index].dayChangePercent = element.dayChangePercent
      this.quoteRecords[index].dayChange = element.dayChange
      this.quoteRecords[index].fiftyDayAverage = element.fiftyDayAverage
      this.quoteRecords[index].fiftyDayAverageChangePercent = element.fiftyDayAverageChangePercent
      this.quoteRecords[index].twoHundredDayAverage = element.twoHundredDayAverage
      this.quoteRecords[index].twoHundredDayAverageChangePercent = element.twoHundredDayAverageChangePercent
      this.quoteRecords[index].fiftyTwoWeekLow = element.fiftyTwoWeekLow
      this.quoteRecords[index].fiftyTwoWeekLowChangePercent = element.fiftyTwoWeekLowChangePercent
      this.quoteRecords[index].fiftyTwoWeekHigh = element.fiftyTwoWeekHigh
      this.quoteRecords[index].fiftyTwoWeekHighChangePercent = element.fiftyTwoWeekHighChangePercent
      this.quoteRecords[index].chartData = element.chartData
    }
  }

  path: string
  ngOnInit() {
    let industryParam = this.route.snapshot.queryParamMap.get('industry')

    let url = this.route.snapshot.url.join().split(',')
    this.path = "/" + url[1] 

    this.http.get<QuoteRecord[]>(this.apiURL + this.url + (industryParam != 'none' ? this.path : '') +
      (this.paging == true ? "/0" : ""))
      .pipe(delay(this.initDelay))
      .subscribe(message => { this.concat(message) })
  }

  ngAfterViewInit() {
    if (this.stream == true){
      this.subscription = this.quoteService.observeMessages(this.apiURL + this.url + this.path)
      .pipe(delay(this.initDelay))
      .subscribe(message => { this.update(message) })
    }
  }

  ngOnDestroy() {
    if (this.stream == true)
      this.subscription.unsubscribe()
  }

  page: number = 1
  onTableScroll(e) {
    if (this.paging == true) {
      const tableViewHeight = e.target.offsetHeight // viewport: ~500px
      const tableScrollHeight = e.target.scrollHeight // length of all table
      const scrollLocation = e.target.scrollTop; // how far user scrolled
      const buffer = 500
      const limit = tableScrollHeight - tableViewHeight - buffer
      if (scrollLocation > limit) {
        this.http.get<QuoteRecord[]>(this.apiURL + this.url + this.path + (this.paging ? "/" + this.page : "") + "?sortProperty=" + this.column + "&sortDirection=" + this.direction).subscribe(message => { this.concat(message) })
        this.page++
      }
    }
  }

  column: String
  direction: String
  onSort({column, direction}: SortEvent) {
    if (this.paging == true) {
      this.direction = direction
    this.column = direction == '' ? '' : column
    this.page = 1

    this.quoteRecords = []
    this. data = this.quoteRecords
    this.http.get<QuoteRecord[]>(this.apiURL + this.url + this.path + (this.paging ? "/0" : "")
      + "?sortProperty=" + this.column + "&sortDirection=" + this.direction)
      .subscribe(message => { this.concat(message) })
    }
    else {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = ''
        }
      });
  
      if (direction === '') {
        this.data = this.quoteRecords;
      } else {
        this.data = [...this.quoteRecords].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }      
    }    
  }

  openSite(siteUrl: string) {
    window.open(siteUrl, '_blank');
  }

  openDialog(vSymbol: string): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {data: { symbol: vSymbol }});
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

export interface DialogData {
  symbol: string;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {
  apiURL = environment.apiUrl;  

  quoteRecord: QuoteRecord = { subIndustry: '', wkn: '', symbol: '', country: '', currency: '', dayChange: 0,
    dayChangePercent: 0, exchange: '', fiftyDayAverage: 0, fiftyDayAverageChangePercent: 0, fiftyTwoWeekHigh: 0,
    fiftyTwoWeekHighChangePercent: 0, fiftyTwoWeekLow: 0, fiftyTwoWeekLowChangePercent: 0, marketCap: 0,
    name: '', premarket:0, price: 0, quoteType: '', twoHundredDayAverage: 0, twoHundredDayAverageChangePercent: 0,
    chartData: [{ data: [] }], historicalMarketClose: [{ data: [] }], apexCandleStickChartSeries: null };

  service: BasicRestService;

  constructor(public http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.service = new BasicRestService(http, this.apiURL + '/quote/' + data.symbol);
    this.service.getQuoteRecord().subscribe(x => this.merge(x));

    for (let i = 0; i < 200; i++) {
      this.chartLabels.push('');
    }
  }

  merge(vData: QuoteRecord) {
    this.quoteRecord = vData;
    this.quoteRecord.historicalMarketClose = [{ data: vData.chartData[0].data.map(x => x.close) }]
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  // tslint:disable-next-line: member-ordering
  chartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        display: true
      }],
      xAxes: [{
        display: false
      }]
    },
    animation: {
      duration: 0
    },
    elements: {
      point: {
          radius: 0
      }
    }
  };

  // tslint:disable-next-line: member-ordering
  chartLabels = [];

  // tslint:disable-next-line: member-ordering
  public greenlineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(0,255,0,0.3)',
      borderColor: 'rgba(0,255,0,0.5)',
      pointBackgroundColor: 'rgba(0,255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  // tslint:disable-next-line: member-ordering
  public redlineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(255,0,0,0.5)',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
}

