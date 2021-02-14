package org.algo.invest.model

import java.math.BigDecimal

data class QuoteRecord(
    val symbol: String,
    val industry: Industry,
    val quoteType: QuoteType,
    val region: String? = null,
    val currency: String? = null,
    val regularMarketDayLow: Float = 0f,
    val regularMarketVolume: Long = 0,
    val regularMarketPreviousClose: Float = 0f,
    val bid: Float = 0f,
    val ask: Float = 0f,
    val bidSize: Int = 0,
    val askSize: Int = 0,
    val fullExchangeName: String? = null,
    val financialCurrency: String? = null,
    val regularMarketOpen: Float = 0f,
    val averageDailyVolume3Month: Long = 0,
    val averageDailyVolume10Day: Long = 0,
    val fiftyTwoWeekLowChange: Float = 0f,
    val fiftyTwoWeekLowChangePercent: Float = 0f,
    val fiftyTwoWeekRange: String? = null,
    val fiftyTwoWeekHighChange: Float = 0f,
    val fiftyTwoWeekHighChangePercent: Float = 0f,
    val fiftyTwoWeekLow: Float = 0f,
    val fiftyTwoWeekHigh: Float = 0f,
    val trailingAnnualDividendRate: Float = 0f,
    val trailingPE: Float = 0f,
    val trailingAnnualDividendYield: Float = 0f,
    val epsTrailingTwelveMonths: Float = 0f,
    val sharesOutstanding: Long = 0,
    val bookValue: Float = 0f,
    val fiftyDayAverage: Float = 0f,
    val fiftyDayAverageChange: Float = 0f,
    val fiftyDayAverageChangePercent: Float = 0f,
    val twoHundredDayAverage: Float = 0f,
    val twoHundredDayAverageChange: Float = 0f,
    val underlyingSymbol: String? = null,
    val exchange: String? = null,
    val shortName: String? = null,
    val longName: String? = null,
    val messageBoardId: String? = null,
    val exchangeTimezoneName: String? = null,
    val exchangeTimezoneShortName: String? = null,
    val gmtOffSetMilliseconds: Long = 0,
    val market: String? = null,
    val esgPopulated: Boolean = false,
    val marketState: String? = null,
    val twoHundredDayAverageChangePercent: Float = 0f,
    val marketCap: Long = 0,
    val priceToBook: Float = 0f,
    val sourceInterval: Int = 0,
    val exchangeDataDelayedBy: Int = 0,
    val tradeable: Boolean = false,
    val priceHint: Int = 0,
    val firstTradeDateMilliseconds: Long = 0,
    val regularMarketChange: Float = 0f,
    val regularMarketChangePercent: Float = 0f,
    val regularMarketTime: Long = 0,
    val regularMarketPrice: BigDecimal = BigDecimal(0),
    val regularMarketDayHigh: Float = 0f,
    val regularMarketDayRange: String? = null
) {
    constructor() : this("", Industry.AEROSPACE_TRAVEL, QuoteType.CRYPTOCURRENCY)
}

data class QuoteSymbolMetaData(
    val symbol: String? = null,
    val name: String? = null,
    val wkn: String? = null,
    val industry: Industry? = null
)

enum class QuoteType {
    EQUITY, CURRENCY, CRYPTOCURRENCY, INDEX, ETF, FUTURE
}

enum class Industry {
    NONE,
    FANG,
    TECH_MANUFACTURING,
    SEMICONDUCTOR,
    MEDIA,
    ECOMMERCE,
    SOFTWARE,
    ITSERVICES,
    CLOUD,
    SECURITY,
    GAMES,
    GASTRONOMY,
    INDUSTRIAL_MANUFACTURING,
    MATERIALS_CHEMICALS,
    COMMUNICATION,
    REALESTATE_CONSTRUCTION,
    FINANCE_INSURANCE_HOLDING,
    EXCHANGE,
    PHARMA,
    MEDTECH,
    MEDSOFTWARE,
    BIOTECH,
    FOOD,
    FOOD_DELIVERY,
    RETAIL,
    CONSUMER_CONGLOMERATE,
    DRESS_SPORTS,
    ENERGY,
    RENEWABLE_ENERGY,
    AKKU,
    AEROSPACE_TRAVEL,
    AUTOMOBILE,
    PAYMENT,
    CAR_RENTAL,
    RECYCLING,
    CHINA
}

enum class Subindustry {

}