import React, { useState, useMemo, useEffect } from 'react';

// --- Data Structure for the Syllabus (condensed for brevity) ---
const syllabusData = [
    {
        id: "I", title: "Theory and History of Technical Analysis",
        subsections: [
            { id: "1.1", title: "A Brief History of Technical Analysis", topics: ["Learning Objective Statements", "Mileposts in Technical Analysis", "MTA: Bringing Recognition to the Practice", "9/11: A Turning Point for the MTA", "Regulatory Recognition", "From MTA to CMT: Today’s CMT Association"] },
            { id: "1.2", title: "The Dow Theory", topics: ["Learning Objective Statements", "Basic Tenets", "Dow Theory Remains Relevant to This Day"] },
            { id: "1.3", title: "Markets, Instruments, Data and the Technical Analyst", topics: ["Learning Objective Statements", "Tradable Markets", "Behind the Scenes of Market Data"] },
            { id: "1.4", title: "The Opportunity of the Efficient Markets Hypothesis", topics: ["Learning Objective Statements", "The Opportunity of the EMH", "Three Forms of the EMH", "Challenges to the EMH", "The Nature of Randomness and the Arcsine Law", "Additional Challenges and Alternatives", "Using Technical Analysis Within a Randomized Market", "Fama’s Revision of the Three Forms"] },
            { id: "1.5", title: "The Fibonacci Sequence and The Golden Ratio", topics: ["Learning Objective Statements", "The Man, The Numbers and Sequence", "The Golden Ratio", "Fibonacci Retracements", "Fibonacci Extensions", "Final Thoughts"] },
        ]
    },
    { id: "II", title: "Charts: Market Price Data", subsections: [ { id: "2.1", title: "An Overview of Charting", topics: ["Learning Objective Statements", "A Brief History of Charting", "Line Charts", "Bar Charts", "Candlestick Charts"] }, { id: "2.2", title: "The X Axis", topics: ["Learning Objective Statements", "Time-Based Charting", "A Closer Look at Time-Based Data Intervals", "Activity-Based Intervals", "Price-Based Intervals"] }, { id: "2.3", title: "The Y Axis", topics: ["Learning Objective Statements", "Arithmetic Scale", "Logarithmic Scale"] }, { id: "2.4", title: "Charting Volume and Open Interest", topics: ["Learning Objective Statements", "Volume", "Open Interest"] } ] },
    { id: "III", title: "Trend Analysis", subsections: [ { id: "3.1", title: "Trend Primer: What is a Trend", topics: ["Learning Objective Statements", "Trends", "Primary Price Movements and the Fractal Nature of Trends", "Support and Resistance"] }, { id: "3.2", title: "Trend Primer: A Trend's Four Phases", topics: ["Learning Objective Statements", "Market Structure", "The Four Trades"] }, { id: "3.3", title: "Trend Primer: Trend Identification and Following", topics: ["Learning Objective Statements", "Why Trends Are Important", "Trend Identification"] }, { id: "3.4", title: "Introduction to Volume Analysis", topics: ["Learning Objective Statements", "Volume Terminology", "Importance of Volume in Market Analysis"] }, { id: "3.5", title: "Volume, Open Interest, and Price", topics: ["Learning Objective Statements", "Decoding Volume", "VWAP: Volume-Weighted Average Price", "Volume and Open Interest in the Futures Markets", "Seasonal Volume Tendencies"] }, { id: "3.6", title: "Market Internals", topics: ["Learning Objective Statements", "Introduction — What Are Market Internals?", "The Basics"] } ] },
    { id: "IV", title: "Chart Pattern Analysis", subsections: [ { id: "4.1", title: "Classical Chart Patterns", topics: ["Learning Objective Statements", "Reversal Chart Patterns", "Continuation Chart Patterns", "Behavior and Emotions Behind Chart Patterns", "Support and Resistance", "Short-Term Patterns", "Gaps"] }, { id: "4.2", title: "Introduction to Candlesticks", topics: ["Learning Objective Statements", "Construction of Candlestick Charts", "Time Frames", "Interpreting Candlesticks", "Application Across Markets"] }, { id: "4.3", title: "Introduction to Candlestick Patterns", topics: ["Learning Objective Statements", "Analyzing Candle Patterns", "The Importance of the Doji", "Strengths and Weaknesses"] }, { id: "4.4", title: "Basics of Point-and-Figure Charting", topics: ["Learning Objective Statements", "What is Point-and-Figure Charting?", "How to Build a Chart", "Basic Chart Patterns", "Trendlines"] } ] },
    { id: "V", title: "Technical Indicators", subsections: [ { id: "5.1", title: "Moving Averages", topics: ["Learning Objective Statements", "Types Of Moving Averages", "The Moving Average Calculation Period", "Strategies for Using Moving Averages"] }, { id: "5.2", title: "Technical Indicator Construction", topics: ["Learning Objective Statements", "Technical Momentum", "Momentum Indicator Construction", "Volume Indicator Construction", "Price and Volume Indicator Construction", "Normalized Indicator Construction", "Trend Strength Indicator Construction"] }, { id: "5.3", title: "Introduction to Bollinger Bands®", topics: ["Learning Objective Statements", "The Origin of Bollinger Bands", "Developing Bollinger Bands", "First Principles", "Calculating Bollinger Bands", "Basic Interpretation", "Why Do Bollinger Bands Work?"] } ] },
    { id: "VI", title: "Statistics for Technicians", subsections: [ { id: "6.1", title: "Introduction to Statistics Part 1", topics: ["Learning Objective Statements", "Descriptive Versus Inferential Statistics", "Measures of Central Tendency", "Measures of Dispersion"] }, { id: "6.2", title: "Introduction to Statistics Part 2", topics: ["Learning Objective Statements", "Data Visualization", "Correlation", "Linear Regression", "Putting It All Together", "Microsoft Excel Functions Used"] }, { id: "6.3", title: "Introduction to Probability", topics: ["Learning Objective Statements", "The Search for the High-Probability Trade", "Properties of Probability", "The Probability Distribution"] } ] },
    { id: "VII", title: "Behavioral Finance", subsections: [ { id: "7.1", title: "Behavioral Finance", topics: ["Learning Objective Statements", "Introduction to Behavioral Finance and Prospect Theory", "Belief Preservation Biases", "Information Processing Biases", "Emotional Biases", "Behavioral Biases and Chart Patterns", "Case Study"] } ] },
    { id: "VIII", title: "Sentiment", subsections: [ { id: "8.1", title: "Market Sentiment and Technical Analysis", topics: ["Learning Objective Statements", "Sentiment Drives Market Prices", "The Crowd Determines Sentiment"] }, { id: "8.2", title: "Sentiment Measured from Market Data", topics: ["Learning Objective Statements", "VIX", "Open Interest", "Commitments of Traders Data", "Insider Trading", "Short Interest"] }, { id: "8.3", title: "Sentiment Measures from External Data", topics: ["Learning Objective Statements", "AAII Survey", "Investors Intelligence", "Magazine Covers", "Mutual Fund Cash/Assets Ratio", "Money Market Fund Assets"] } ] },
    { id: "IX", title: "Cycle Analysis", subsections: [ { id: "9.1", title: "Foundations of Cycle Theory", topics: ["Learning Objective Statements", "Cycle Characteristics", "Principles", "What Is a Dominant Cycle?", "Fixed Cycle Tools"] }, { id: "9.2", title: "Common Cycles", topics: ["Learning Objective Statements", "Natural Cycles", "Notable Cycles"] } ] },
    { id: "X", title: "Comparative Market Analysis", subsections: [ { id: "1.1", title: "Equities", topics: ["Learning Objective Statements", "What Are Equities?", "Benefits for Investors", "Other Forms of Equity", "What Does a Technical Analyst Need?", "Segmenting the Market for Analysis"] }, { id: "1.2", title: "Indexes", topics: ["Learning Objective Statements", "What Are Indexes?", "Benefits for Investors", "Other Indexes", "Index Construction and Weighting", "Survivorship Bias", "Using Indexes", "Data Types Available"] }, { id: "1.3", title: "Fixed Income/Bonds", topics: ["Learning Objective Statements", "What Are Bonds?", "Benefits for Investors", "Major Issuers of Bonds", "Components of a Bond", "Typical Information in a Bond Quote", "Yield Curve"] }, { id: "1.4", title: "Futures", topics: ["Learning Objective Statements", "What Are Futures?", "Benefits for Investors", "Futures Terminology", "Futures Markets by Asset Class", "Challenges for a Technician"] }, { id: "1.5", title: "Exchange-Traded Products (ETPs)", topics: ["Learning Objective Statements", "What Are ETPs?", "Beneﬁts for Investors", "ETFs Versus ETNs", "Leveraged and Inverse ETFs", "REITs", "ETPs and Market Breadth"] }, { id: "1.6", title: "Foreign Exchange (Currencies)", topics: ["Learning Objective Statements", "What Is Foreign Exchange?", "Beneﬁts for Investors", "Base Currency", "Pips and Spreads", "Available Data"] }, { id: "1.7", title: "Digital Assets", topics: ["Learning Objective Statements", "What Are Digital Assets?", "The Evolution of Digital Assets", "Why Do They Exist?", "Economics and Governance", "Categorizing Digital Assets", "Unique Data", "The Evolving Market Structure", "Why TA is Suited for Crypto"] }, { id: "1.8", title: "Options", topics: ["Learning Objective Statements", "What Are Options?", "Benefits for Investors", "Options Terminology", "Using the Options Market", "Components of Options Prices", "Implied Volatility (IV)", "Options Strategies"] }, { id: "1.9", title: "Introduction to Relative Strength", topics: ["Learning Objective Statements", "Relative Strength History", "Assessing Relative Strength", "Relative Strength Considerations", "Ranking with Relative Strength", "Institutional vs Private Investors"] }, { id: "1.10", title: "Relative Strength and its Uses", topics: ["Learning Objective Statements", "Assessing the Market Environment", "Stock Picking", "Using Relative Strength"] } ] },
    { id: "XI", title: "Volatility Analysis", subsections: [ { id: "11.1", title: "The Meaning of Volatility to a Technician", topics: ["Learning Objective Statements", "Definition of Volatility", "Importance of Measuring Volatility", "Types of Volatility", "Volatility Skew"] }, { id: "11.2", title: "Measuring Historical Volatility", topics: ["Learning Objective Statements", "Standard Deviation of Closing Prices", "Average True Range", "Bollinger Bands", "Keltner Channels"] }, { id: "11.3", title: "Options Derived Volatility", topics: ["Learning Objective Statements", "Calculation of Implied Volatility", "Application to Price Movements", "Introduction to VIX", "VIX through Bull and Bear Cycles", "VIX and Seasonality", "Various Published VIX Indexes", "Using VIX for Signals"] } ] },
    { id: "XII", title: "Systems and Quantitative Methods", subsections: [ { id: "12.1", title: "Introduction to Quantitative Methods", topics: ["Learning Objective Statements", "The Investment Process", "The Scientific Method", "Preparing for Quantitative Analysis", "The Quantitative Process", "Quant for Discretionary Analysts", "The Importance of Context"] } ] }
];

// --- Quiz Data ---
const quizData = {
    "1.1": {
        title: "A Brief History of Technical Analysis",
        questions: [
            { question: "Who is considered the founding father of technical analysis in the United States?", options: ["Robert D. Edwards", "Charles H. Dow", "Ralph N. Elliott", "W. D. Gann"], answer: "Charles H. Dow" },
            { question: "The earliest known use of candlestick charts is attributed to Homma Munehisa, who plotted the price of what commodity in 18th-century Japan?", options: ["Diamonds", "Gold", "Rice", "Lottery tickets"], answer: "Rice" },
            { question: "The concept that stock prices follow natural laws using Fibonacci numbers was published in the late 1930s as \"The Wave Principle\" by which individual?", options: ["Richard Wyckoff", "Jesse Livermore", "Charles Bergstresser", "Ralph Nelson Elliott"], answer: "Ralph Nelson Elliott" },
            { question: "The four distinct phases of price cycles—accumulation, markup, distribution, and markdown—were outlined by which technician in the early 1920s?", options: ["Richard Wyckoff", "Lyman M. Lowry", "Martin E. Zweig", "Leonard P. Ayres"], answer: "Richard Wyckoff" },
            { question: "Who was unanimously elected as the first president of the Market Technicians Association (MTA) when it was incorporated in 1973?", options: ["Ralph J. Acampora", "Alan R. Shaw", "Robert J. Farrell", "John C. Brooks"], answer: "Robert J. Farrell" },
            { question: "According to the text, what was the primary motivation for Ralph Acampora and John Brooks to establish the MTA?", options: ["To create a library for technical analysis books.", "To compete directly with the New York Society of Security Analysts (NYSSA).", "They felt technical analysts were treated as \"second-class citizens\" compared to fundamental analysts.", "To standardize the use of point-and-figure charting across Wall Street."], answer: "They felt technical analysts were treated as \"second-class citizens\" compared to fundamental analysts." },
            { question: "The Sarbanes-Oxley Act of 2002 led the SEC to require Wall Street analysts to pass which examination series to be deemed an official research analyst?", options: ["Series 7", "Series 63", "Series 86", "Series 99"], answer: "Series 86" },
            { question: "What was the key argument presented by MTA representatives to the SEC, FINRA, and NYSE that ultimately led to regulatory recognition for the CMT designation?", options: ["\"The trend is your friend.\"", "\"When everybody thinks alike, everybody is likely to be wrong.\"", "\"Price is a fact; earnings are an estimate.\"", "\"Past prices cannot be used to predict future prices.\""], answer: "\"Price is a fact; earnings are an estimate.\"" },
            { question: "The concept of Evidence-Based Technical Analysis (EBTA), which is restricted to objective and quantifiable rules, was introduced by which author?", options: ["Perry J. Kaufman", "Thomas R. DeMark", "Norman G. Fosback", "David R. Aronson"], answer: "David R. Aronson" },
            { question: "The Dow Jones Industrial Average and the Railroad Average were first published in which newspaper founded by Charles Dow and Edward Jones?", options: ["The Springfield Daily Republican", "The Customers’ Afternoon Letter", "The Wall Street Journal", "The New York Times"], answer: "The Wall Street Journal" },
            { question: "Who is considered the father of the Advance/Decline Line, having pioneered the use of stock market breadth?", options: ["Garfield Drew", "Leonard P. Ayres", "Humphrey Neil", "S. A. Nelson"], answer: "Leonard P. Ayres" },
            { question: "The seminal book Technical Analysis of Stock Trends, which identified numerous classic price patterns, was authored by which pair?", options: ["Graham and Dodd", "Edwards and Magee", "Dow and Jones", "Frost and Prechter"], answer: "Edwards and Magee" },
            { question: "Martin Zweig, a financial advisor and TV panelist, is credited with popularizing which of the following iconic phrases?", options: ["\"Buy on the rumor, sell on the news.\"", "\"Don't fight the Fed.\"", "\"The market can stay irrational longer than you can stay solvent.\"", "\"Be fearful when others are greedy.\""], answer: "\"Don't fight the Fed.\"" },
            { question: "While Charles Dow never used the term himself, his original concepts were formally titled \"The Dow Theory\" by whom?", options: ["William Peter Hamilton", "S. A. Nelson", "Edward Davis Jones", "Richard W. Schabacker"], answer: "S. A. Nelson" },
            { question: "What event served as a major turning point for the MTA, leading it to transition from a volunteer-run organization to one managed by professionals and to outsource its exams to Prometric?", options: ["The SEC's approval of the Series 86 exemption.", "The publication of A Random Walk Down Wall Street.", "The name change to the CMT Association in 2017.", "The 9/11 terrorist attacks, which destroyed its office."], answer: "The 9/11 terrorist attacks, which destroyed its office." },
            { question: "In what year did the MTA administer the first exams for Levels I and II of the Chartered Market Technician (CMT) designation?", options: ["1973", "1988", "2001", "2005"], answer: "1988" },
            { question: "Humphrey Neil's book The Art of Contrary Thinking puts forth which central idea?", options: ["The majority is always correct at major market turning points.", "When everybody thinks alike, everybody is likely to be wrong.", "Crowd psychology has no bearing on financial markets.", "Small investors are more informed than institutional investors."], answer: "When everybody thinks alike, everybody is likely to be wrong." },
            { question: "A sentiment indicator based on comparing the activity of investors buying less than 100 shares to those buying 100-share lots was popularized by whom?", options: ["Jesse Livermore", "Joseph Granville", "Garfield Drew", "W. D. Gann"], answer: "Garfield Drew" },
            { question: "The MTA's effort to unite the geographically dispersed technical community involved inviting well-known technicians to speak at its meetings, such as Joseph Granville, who was famous for what indicator?", options: ["Advance/Decline Line", "On-Balance Volume (OBV)", "Fibonacci Retracements", "Gann Angles"], answer: "On-Balance Volume (OBV)" },
            { question: "In 2017, the Market Technicians Association (MTA) officially changed its name to the:", options: ["Society of Technical Analysts (STA).", "International Federation of Technical Analysts (IFTA).", "Chartered Market Technicians Association Inc. (CMT).", "American Association of Professional Technical Analysts (AAPTA)."], answer: "Chartered Market Technicians Association Inc. (CMT)." },
        ]
    },
    "1.2": {
        title: "The Dow Theory",
        questions: [
            { question: "What two stock averages did Charles Dow create and insist must confirm each other to provide meaningful signals about the U.S. economy?", options: ["The Transportation Average and the Utility Average", "The Industrial Average and the Railroad Average", "The Composite Average and the Financial Average", "The Railroad Average and the Technology Average"], answer: "The Industrial Average and the Railroad Average" },
            { question: "According to the basic tenets of Dow Theory, the most important price of the day is the:", options: ["opening price.", "intraday high.", "intraday low.", "closing price."], answer: "closing price." },
            { question: "The critical word and central concept of the Dow Theory, which states that both averages must be moving in the same direction, is known as:", options: ["divergence.", "confirmation.", "momentum.", "discounting."], answer: "confirmation." },
            { question: "How is a primary trend defined within the framework of the Dow Theory?", options: ["A trend lasting a year or more", "A trend lasting several weeks to several months", "A near-term fluctuation lasting days", "A trend lasting exactly three months"], answer: "A trend lasting a year or more" },
            { question: "A confirmed uptrend is signaled under the Dow Theory when:", options: ["the Industrial Average makes a new high, regardless of the Transportation Average.", "volume increases for three consecutive days.", "both averages close above their previous important secondary highs.", "one average makes a new high and the other makes a new low."], answer: "both averages close above their previous important secondary highs." },
            { question: "Charles Dow never used the term \"Dow Theory\" himself. Who first coined this title in the book The ABC of Stock Speculation?", options: ["William Peter Hamilton", "Robert Rhea", "S.A. Nelson", "Richard Russell"], answer: "S.A. Nelson" },
            { question: "On January 2, 1970, the Dow Jones Railroad Average was updated to include airlines and truckers and was renamed the:", options: ["Dow Jones Logistics Average.", "Dow Jones Composite Average.", "Dow Jones Transportation Average.", "Dow Jones Industrial Average."], answer: "Dow Jones Transportation Average." },
            { question: "The tenet stating that the market anticipates future news relates to the idea that the stock market is a discounting mechanism that looks ahead at least:", options: ["one week.", "one month.", "three months.", "one year."], answer: "three months." },
            { question: "Which of the three primary price movements in Dow Theory is described as lasting from several weeks to several months?", options: ["Minor trend", "Primary trend", "Secular trend", "Secondary trend"], answer: "Secondary trend" },
            { question: "According to Dow Theory, a potential change in the primary trend is first signaled by:", options: ["a sharp increase in daily trading volume.", "the averages confirming each other on the exact same day.", "one average failing to confirm a new closing high or low made by the other.", "the market looking more than six months into the future."], answer: "one average failing to confirm a new closing high or low made by the other." },
            { question: "What was Charles Dow's rationale for using both the industrial and railroad averages in his analysis?", options: ["They were the only two sectors with sufficient historical data.", "He believed producers (industrials) and shippers (railroads) were the critical interdependent parts of the economy.", "They were the least volatile sectors of the stock market.", "They were the two largest averages by number of component stocks."], answer: "He believed producers (industrials) and shippers (railroads) were the critical interdependent parts of the economy." },
            { question: "To validate a primary trend, Dow Theory expects volume to:", options: ["decrease as the trend progresses.", "remain constant throughout the trend.", "increase in the direction of the trend.", "move inversely to the direction of the trend."], answer: "increase in the direction of the trend." },
            { question: "Which individual finetuned Dow's original concepts and published the book The Stock Market Barometer in 1922?", options: ["Robert Rhea", "E. George Schaefer", "Richard Russell", "William Peter Hamilton"], answer: "William Peter Hamilton" },
            { question: "A confirmed downtrend is identified under the Dow Theory when:", options: ["both averages close below their previous important secondary lows.", "the Transportation Average makes a new low, regardless of the Industrial Average.", "both averages have been declining for three consecutive weeks.", "trading volume decreases for five consecutive days."], answer: "both averages close below their previous important secondary lows." },
            { question: "Near-term price fluctuations that last for days are defined as what type of movement in Dow Theory?", options: ["Primary", "Secondary", "Minor", "Secular"], answer: "Minor" },
            { question: "The modern technician who published the Dow Theory Letters from 1958 through 2015 and was considered the living guru of the theory was:", options: ["Ralph Acampora.", "Alan Shaw.", "Robert Prechter.", "Richard Russell."], answer: "Richard Russell." },
            { question: "Why did Charles Dow believe using only closing prices was sufficient for his analysis?", options: ["They were the easiest prices to obtain for his newspaper.", "They represent the most important prices of the day.", "They are less volatile than opening prices.", "They were the only prices available in the 19th century."], answer: "They represent the most important prices of the day." },
            { question: "According to the text, the concept of confirmation has become a:", options: ["controversial and outdated part of technical analysis.", "bedrock of technical analysis.", "minor footnote in the history of Dow Theory.", "method used only by followers of Richard Russell."], answer: "bedrock of technical analysis." },
            { question: "Which of the following is NOT one of the three primary movements identified in Dow Theory?", options: ["Primary trend", "Secondary trend", "Minor trend", "Daily trend"], answer: "Daily trend" },
            { question: "When the averages must confirm each other's direction, the Dow Theory states that the confirmation:", options: ["must occur on the exact same day.", "can occur within a reasonable period of time.", "must occur within 24 hours.", "must be accompanied by a reversal in volume."], answer: "can occur within a reasonable period of time." }
        ]
    }
};

// --- SVG Icons & Decorative Components ---
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300"><path d="m6 9 6 6 6-6"/></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-black group-hover:text-white transition-colors duration-300"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const CorrectIcon = () => <img src="https://i.ibb.co/L9j32jQ/image-4e5e72.jpg" alt="Correct" className="h-6 w-6 mr-2" />;
const IncorrectIcon = () => <img src="https://i.ibb.co/GHYrtL1/image-4e6177.png" alt="Incorrect" className="h-6 w-6 mr-2" />;

const SectionIcon = ({ icon }) => {
    const icons = {
        "I": () => <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />, // History
        "II": () => <path d="M3 3v18h18" />, // Charts
        "III": () => <path d="M17 7l-5 5-5-5M17 17l-5-5-5 5" />, // Trend
        "IV": () => <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />, // Patterns
        "V": () => <circle cx="12" cy="12" r="10" />, // Indicators
        "VI": () => <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />, // Stats
        "VII": () => <path d="M12 17.5c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3.5-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>, // Behavioral
        "VIII": () => <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>, // Sentiment
        "IX": () => <path d="M21.5 4.5c-1.8-1.8-4.2-2.8-6.8-3-2.6.2-5 1.2-6.8 3-1.8 1.8-2.8 4.2-3 6.8.2 2.6 1.2 5 3 6.8 1.8 1.8 4.2 2.8 6.8 3 2.6-.2 5-1.2 6.8-3 1.8-1.8 2.8-4.2 3-6.8-.2-2.6-1.2-5-3-6.8zM12 18V6"/>, // Cycles
        "X": () => <path d="M2 12h20M12 2v20"/>, // Comparative
        "XI": () => <path d="m21.21 15.89-1.42-1.42a2 2 0 0 0-2.82 0l-1.42 1.42a2 2 0 0 1-2.82 0l-1.42-1.42a2 2 0 0 0-2.82 0l-1.42 1.42a2 2 0 0 1-2.82 0L2.78 14.47" />, // Volatility
        "XII": () => <path d="M18 16c-3.97 0-7-3.03-7-7s3.03-7 7-7c1.1 0 2.12.27 3 .74V2H5v16h13zM18 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>, // Systems
    };
    const IconComponent = icons[icon] || icons["V"];
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-cyan-400">
            <IconComponent />
        </svg>
    )
};


// --- Reusable Components ---
const ConfidenceSelector = ({ level, onSelect }) => {
    const levels = [
        { name: 'Low', color: 'bg-red-500/20 text-red-300 border-red-500/30', hover: 'hover:bg-red-500/40' },
        { name: 'Mid', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', hover: 'hover:bg-yellow-500/40' },
        { name: 'High', color: 'bg-green-500/20 text-green-300 border-green-500/30', hover: 'hover:bg-green-500/40' },
    ];
    return (<div className="flex items-center space-x-2">{levels.map(({ name, color, hover }) => (<button key={name} onClick={() => onSelect(name)} className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-200 ${level === name ? color : 'bg-slate-700/50 text-slate-300 border-slate-600 ' + hover}`}>{name}</button>))}</div>);
};

// --- Quiz Modal Component ---
const QuizModal = ({ quiz, onClose }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const questions = quiz.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const handleAnswerSelect = (option) => { if (isAnswered) return; setSelectedAnswer(option); setIsAnswered(true); if (option === currentQuestion.answer) { setScore(prev => prev + 1); } };
    const handleNext = () => { if (currentQuestionIndex < questions.length - 1) { setCurrentQuestionIndex(prev => prev + 1); setSelectedAnswer(null); setIsAnswered(false); } else { setShowResults(true); } };
    const handleRestart = () => { setCurrentQuestionIndex(0); setScore(0); setSelectedAnswer(null); setIsAnswered(false); setShowResults(false); };
    const getButtonClass = (option) => { if (!isAnswered) { return 'border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/80 hover:shadow-cyan-400/20'; } if (option === currentQuestion.answer) { return 'border-green-400/80 bg-green-500/20 text-green-300 font-semibold shadow-green-500/30'; } if (option === selectedAnswer) { return 'border-red-400/80 bg-red-500/20 text-red-300 shadow-red-500/30'; } return 'border-slate-700 opacity-50'; };
    useEffect(() => { const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown); }, [onClose]);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-900/70 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl shadow-cyan-500/10 flex flex-col max-h-[90vh]">
                <header className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-lg font-bold rainbow-text-animated">Quiz: {quiz.title}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><XIcon /></button>
                </header>
                <main className="flex-1 p-6 overflow-y-auto">
                    {showResults ? (<div className="text-center"><h3 className="text-3xl font-bold rainbow-text-animated mb-4">Quiz Complete!</h3><div className="bg-slate-800/50 border-2 border-slate-700 rounded-lg p-6 mb-8"><p className="text-lg text-slate-300">Your Final Score</p><p className="text-6xl font-extrabold text-cyan-400 my-2">{score} / {questions.length}</p><p className="text-xl font-medium text-slate-200">{Math.round((score / questions.length) * 100)}%</p></div></div>) : (<div><div className="flex justify-between items-center text-sm text-slate-400 mb-4"><p>Question {currentQuestionIndex + 1} of {questions.length}</p><p className="font-semibold">Score: {score}</p></div><div className="w-full bg-slate-700 rounded-full h-2 mb-6"><div className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 h-2 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div></div><h3 className="text-xl font-bold text-slate-100 mb-6">{currentQuestion.question}</h3><div className="space-y-3">{currentQuestion.options.map((option, index) => (<button key={index} onClick={() => handleAnswerSelect(option)} disabled={isAnswered} className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-start text-slate-200 shadow-lg ${getButtonClass(option)}`}>{isAnswered && option === currentQuestion.answer && <CorrectIcon />}{isAnswered && option === selectedAnswer && option !== currentQuestion.answer && <IncorrectIcon />}<span className="flex-1">{option}</span></button>))}</div></div>)}
                </main>
                <footer className="p-4 bg-slate-900/50 border-t border-slate-700 rounded-b-2xl">
                    {showResults ? (<button onClick={handleRestart} className="neon-button w-full from-slate-600 to-slate-700">Restart Quiz</button>) : (<button onClick={handleNext} disabled={!isAnswered} className="neon-button w-full from-cyan-500 to-blue-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:text-slate-400">{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</button>)}
                </footer>
            </div>
        </div>
    );
};

const AnimatedBackground = () => (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-slate-900">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute rounded-full bg-cyan-400/10 animate-pulse" style={{
                    width: `${Math.random() * 150 + 50}px`,
                    height: `${Math.random() * 150 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 10}s`,
                }}></div>
            ))}
        </div>
    </div>
);


// --- Main Application Component ---
export default function App() {
    const [confidenceLevels, setConfidenceLevels] = useState({});
    const [expandedSubsections, setExpandedSubsections] = useState({});
    const [activeQuiz, setActiveQuiz] = useState(null);

    const totalTopics = useMemo(() => syllabusData.reduce((acc, section) => acc + section.subsections.reduce((subAcc, sub) => subAcc + sub.topics.length, 0), 0), []);
    const reviewedTopics = Object.keys(confidenceLevels).length;
    const progress = totalTopics > 0 ? (reviewedTopics / totalTopics) * 100 : 0;

    const handleConfidenceChange = (topicKey, level) => setConfidenceLevels(prev => ({ ...prev, [topicKey]: level }));
    const toggleSubsection = (subsectionKey) => setExpandedSubsections(prev => ({ ...prev, [subsectionKey]: !prev[subsectionKey] }));
    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
                body { background-color: #0F172A; }
                .font-pixie { font-family: 'VT323', monospace; }
                .rainbow-text-animated {
                    background: linear-gradient(270deg, #ff00ff, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff, #ff00ff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: rainbow-animation 8s linear infinite;
                    background-size: 200% 200%;
                    text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
                }
                @keyframes rainbow-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .neon-button {
                    background-image: linear-gradient(to right, var(--tw-gradient-stops));
                    color: white;
                    font-weight: bold;
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    border: 2px solid transparent;
                }
                .neon-button:before {
                    content: '';
                    position: absolute;
                    top: 0; right: 0; bottom: 0; left: 0;
                    z-index: -1;
                    margin: -2px;
                    border-radius: inherit;
                    background: linear-gradient(to right, #00FFFF, #FF00FF);
                    filter: blur(8px);
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }
                .neon-button:hover:before {
                    filter: blur(12px);
                    opacity: 1;
                }
                 .neon-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(0, 255, 255, 0.4);
                 }
                @keyframes fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
                @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-down { animation: fade-in-down 0.3s ease-out; }
            `}</style>
            <div className="bg-slate-900 min-h-screen font-pixie text-slate-300 relative">
                <AnimatedBackground />
                
                <div className="flex relative z-10">
                    <aside className="w-64 h-screen sticky top-0 bg-slate-900/50 border-r border-slate-800 p-6 hidden lg:block backdrop-blur-md">
                        <div className="flex items-center space-x-3 mb-8 group">
                            <div className="bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-2 rounded-lg shadow-lg shadow-cyan-500/20 group-hover:shadow-fuchsia-500/30 transition-all duration-300">
                                <BookOpenIcon />
                            </div>
                            <div>
                                <h1 className="font-bold text-xl text-slate-100">CMT Level I</h1>
                                <p className="text-xs text-cyan-400">Neon Study Guide</p>
                            </div>
                        </div>
                        <nav><ul className="space-y-2">{syllabusData.map(section => (<li key={section.id}><a href={`#${section.id}`} onClick={(e) => { e.preventDefault(); handleScrollTo(section.id); }} className="flex items-start p-2 rounded-md text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors"><span className="font-semibold text-cyan-400 w-8">{section.id}.</span><span className="text-sm font-medium">{section.title}</span></a></li>))}</ul></nav>
                    </aside>
                    <main className="flex-1 p-4 sm:p-6 md:p-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800 mb-10 sticky top-4 z-20 shadow-lg shadow-black/30">
                                <h2 className="text-4xl font-bold mb-2 rainbow-text-animated">Welcome to your CMT Study Guide</h2>
                                <p className="text-slate-400 mb-4 text-lg">Track your confidence level for each topic to prepare for the exam.</p>
                                <div className="flex justify-between items-center text-sm text-slate-400 mb-1"><span>Progress</span><span className="font-semibold">{reviewedTopics} / {totalTopics} Topics Reviewed</span></div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
                            </div>
                            <div className="space-y-12">
                                {syllabusData.map(section => (
                                    <section key={section.id} id={section.id} className="scroll-mt-24">
                                        <h3 className="text-3xl font-bold text-slate-100 pb-2 border-b-2 border-cyan-500/50 mb-6 flex items-center">
                                            <SectionIcon icon={section.id} />
                                            <span className="text-cyan-400 mr-2">{section.id}.</span>{section.title}
                                        </h3>
                                        <div className="space-y-4">
                                            {section.subsections.map(sub => {
                                                const subsectionKey = `${section.id}-${sub.id}`;
                                                const isExpanded = !!expandedSubsections[subsectionKey];
                                                return (
                                                    <div key={subsectionKey} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-cyan-500/20 hover:border-cyan-500/50">
                                                        <button onClick={() => toggleSubsection(subsectionKey)} className="w-full flex justify-between items-center p-4 hover:bg-slate-800/70 transition-colors text-left">
                                                            <h4 className="font-semibold text-xl text-slate-200">{sub.id} {sub.title}</h4>
                                                            <span className={`text-cyan-400 ${isExpanded ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
                                                        </button>
                                                        {isExpanded && (
                                                            <div className="animate-fade-in-down">
                                                                <ul className="divide-y divide-slate-800/70">
                                                                    {sub.topics.map((topic, index) => {
                                                                        const topicKey = `${subsectionKey}-${index}`;
                                                                        return (<li key={topicKey} className="flex justify-between items-center p-4 text-base"><span className="text-slate-300">{topic}</span><ConfidenceSelector level={confidenceLevels[topicKey]} onSelect={(level) => handleConfidenceChange(topicKey, level)} /></li>);
                                                                    })}
                                                                </ul>
                                                                {quizData[sub.id] && (
                                                                    <div className="p-4 border-t border-slate-700 bg-slate-800/30">
                                                                        <button onClick={() => setActiveQuiz(sub.id)} className="neon-button from-cyan-500 to-blue-600 flex items-center justify-center">
                                                                            <PlayIcon /> Start Quiz
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
                {activeQuiz && (<QuizModal quiz={quizData[activeQuiz]} onClose={() => setActiveQuiz(null)} />)}
            </div>
        </>
    );
}

