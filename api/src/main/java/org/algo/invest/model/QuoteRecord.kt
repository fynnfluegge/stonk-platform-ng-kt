package org.algo.invest.model

import org.algo.invest.dto.ChartDataDto
import org.algo.invest.dto.QuoteDto
import java.time.Instant
import java.util.*
import java.text.SimpleDateFormat




data class QuoteRecord(
    val symbol: String? = null,
    val industry: Industry? = null,
    val quoteType: QuoteType? = null,
    val region: String? = null,
    val currency: String? = null,
    val regularMarketVolume: Long = 0,
    val marketState: String? = null,
    val bid: Float = 0f,
    val ask: Float = 0f,
    val bidSize: Int = 0,
    val askSize: Int = 0,
    val displayName: String? = null,
    val fullExchangeName: String? = null,
    val financialCurrency: String? = null,
    val averageDailyVolume3Month: Long = 0,
    val averageDailyVolume10Day: Long = 0,

    val earningsTimestamp: Long = 0,
    val trailingPE: Float = 0f,
    val forwardPE: Float = 0f,
    val epsTrailingTwelveMonths: Float = 0f,
    val epsForward: Float = 0f,
    val epsCurrentYear: Float = 0f,
    val priceEpsCurrentYear: Float = 0f,
    val trailingAnnualDividendYield: Float = 0f,
    val sharesOutstanding: Long = 0,
    val marketCap: Long = 0,
    val bookValue: Float = 0f,
    val priceToBook: Float = 0f,
    val averageAnalystRating: String? = null,

    val regularMarketPreviousClose: Float = 0f,
    val regularMarketChange: Float = 0f,
    val regularMarketChangePercent: Float = 0f,
    val regularMarketTime: Long = 0,
    val regularMarketPrice: Float = 0f,
    val regularMarketOpen: Float = 0f,
    val regularMarketDayHigh: Float = 0f,
    val regularMarketDayLow: Float = 0f,
    val preMarketChange: Float = 0f,
    val preMarketChangePercent: Float = 0f,
    val postMarketChange: Float = 0f,
    val postMarketChangePercent: Float= 0f,

    val fiftyDayAverage: Float = 0f,
    val fiftyDayAverageChange: Float = 0f,
    val fiftyDayAverageChangePercent: Float = 0f,
    val fiftyTwoWeekLowChange: Float = 0f,
    val fiftyTwoWeekLowChangePercent: Float = 0f,
    val fiftyTwoWeekHighChange: Float = 0f,
    val fiftyTwoWeekHighChangePercent: Float = 0f,
    val fiftyTwoWeekLow: Float = 0f,
    val fiftyTwoWeekHigh: Float = 0f,
    val twoHundredDayAverage: Float = 0f,
    val twoHundredDayAverageChange: Float = 0f,
    val twoHundredDayAverageChangePercent: Float = 0f,

    val exchange: String? = null,
    val messageBoardId: String? = null,
    val exchangeTimezoneName: String? = null,
    val exchangeTimezoneShortName: String? = null,
    val gmtOffSetMilliseconds: Long = 0,
    val market: String? = null,
    val esgPopulated: Boolean = false,
    val sourceInterval: Int = 0,
    val exchangeDataDelayedBy: Int = 0,
    val tradeable: Boolean = false,
    val priceHint: Int = 0,
    val firstTradeDateMilliseconds: Long = 0,
)

var format = SimpleDateFormat("dd-MM-yyyy")

fun QuoteRecord.toDto(chartData: ChartDataDto, quoteSymbolMetaData: QuoteSymbolMetaData) =
    QuoteDto(
        subIndustry = quoteSymbolMetaData.subIndustry?.toString() ?: "",
        symbol = symbol,
        name = displayName ?: quoteSymbolMetaData.name,
        wkn = quoteSymbolMetaData.wkn,
        currency = currency,
        marketCap = marketCap,
        priceToBookRatio = priceToBook,
        price = regularMarketPrice,
        dayChange = regularMarketChange,
        dayChangePercent = regularMarketChangePercent,
        preMarketChange = preMarketChange,
        preMarketChangePercent = preMarketChangePercent,
        postMarketChange = postMarketChange,
        postMarketChangePercent = postMarketChangePercent,
        fiftyDayAverage = fiftyDayAverage,
        fiftyDayAverageChangePercent = fiftyDayAverageChangePercent,
        twoHundredDayAverage = twoHundredDayAverage,
        twoHundredDayAverageChangePercent = twoHundredDayAverageChangePercent,
        fiftyTwoWeekHigh = fiftyTwoWeekHigh,
        fiftyTwoWeekHighChangePercent = fiftyTwoWeekHighChangePercent,
        fiftyTwoWeekLow = fiftyTwoWeekLow,
        fiftyTwoWeekLowChangePercent = fiftyTwoWeekLowChangePercent,
        trailingPE = trailingPE,
        forwardPE = forwardPE,
        epsTrailingTwelveMonths = epsTrailingTwelveMonths,
        epsForward = epsForward,
        epsCurrentYear = epsCurrentYear,
        priceEpsCurrentYear = priceEpsCurrentYear,
        trailingAnnualDividendYield = trailingAnnualDividendYield,
        sharesOutstanding = sharesOutstanding,
        averageAnalystRating = averageAnalystRating,
        earningsDate = format.format(Date.from(Instant.ofEpochMilli(earningsTimestamp*1000))),
        quoteType = quoteType,
        chartData = listOf(chartData)
    )

data class QuoteSymbolMetaData(
    val symbol: String? = null,
    val name: String? = null,
    val wkn: String? = null,
    val industry: Industry? = null,
    val subIndustry: SubIndustry? = null
)

enum class QuoteType {
    EQUITY, CURRENCY, CRYPTOCURRENCY, INDEX, ETF, FUTURE
}

enum class Industry {
    INDICES,
    HEALTH,
    INDUSTRIAL,
    MOBILITY,
    TECH,
    MEDIA,
    FINANCE,
    FOOD,
    RETAIL,
    ENERGY,
    OTHER
}

enum class SubIndustry {
    ETF,
    FANG,
    MANUFACTURING,
    SEMICONDUCTOR,
    ECOMMERCE,
    SOFTWARE,
    CLOUD,
    SAAS,
    SECURITY,
    FOOD,
    GASTRONOMY,
    MATERIALS,
    CHEMICALS,
    TELECOMMUNICATION,
    REALESTATE,
    PHARMA,
    MEDTECH,
    BIOTECH,
    DELIVERY,
    APPAREL,
    SPORTS,
    CONVENTIONAL,
    RENEWABLE,
    AKKU,
    AEROSPACE,
    TRAVEL,
    AUTOMOBILE,
    PAYMENT,
    BANK,
    EXCHANGE,
    RENTAL,
    RECYCLING,
    GAMES,
    TELEVISION,
    MUSIC,
    CHINA,
    CONSUMER,
    SERVICES,
    OTHER,
    PUMPNDUMP
}