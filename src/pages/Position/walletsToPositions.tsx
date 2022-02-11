

const walletToPositions: {[id: string]: number[]} = {"0x8B34772664bB15D700ba9eD46921692eF9e2a7bD":[1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121,126,131,136,141,146,151,156,161,166,171,176,181,186,191,196,201,206,211,216,221,226,231,236,241,246,251,256,261,266,271,276,281,286,291,296,301,306,311,316,321,326,331,336,341,346,351,356,361,366,371,376,381,386,391,396],"0x89044A9f24E3251269603c0fb7Ff0396a2d71A89":[33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413],"0xCa9c8D118c0B3b8B2a0470e8476A661D59B1Dd19":[53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423],"0xf07dE3eB4Cd58835B218a59FDFc84100d7D0e994":[61,66,71,76,81,86,91,96,101,106,111,116,121,126,131,136,141,146,151,156,161,166,171,176,181,186,191,196,201,206,211,216,221,226,231,236,241,246,251,256,261,266,271,276,281,286,291,296,301,306,311,316,321,326,331,336,341,346,351,356,361,366,371,376,381,386,391,396,401,406,411,416,421,426],"0xB91f22EC5708c831803158E7c352635E0165Ed6D":[91,96,101,106,111,116,121,126,131,136,141,146,151,156,161,166,171,176,181,186,191,196,201,206,211,216,221,226,231,236,241,246,251,256,261,266,271,276,281,286,291,296,301,306,311,316,321,326,331,336,341,346,351,356,361,366,371,376,381,386,391,396,401,406,411,416,421,426,431,436,441],"0x56632dCb40E4ca09B048b3D703187ca586eb2100":[170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480],"0xf4B93Ea126d9C4d44197802bF570acab113f6680":[181,186,191,196,201,206,211,216,221,226,231,236,241,246,251,256,261,266,271,276,281,286,291,296,301,306,311,316,321,326,331,336,341,346,351,356,361,366,371,376,381,386,391,396,401,406,411,416,421,426,431,436,441,446,451,456,461,466,471,476,481,486],"0xBa7eFD84472246cB0d551B377025518c4A98e4fc":[193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493],"0xcd6aA876E72801D073c8c290110029A47dB1A8B1":[194,199,204,209,214,219,224,229,234,239,244,249,254,259,264,269,274,279,284,289,294,299,304,309,314,319,324,329,334,339,344,349,354,359,364,369,374,379,384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494],"0x8eB8Eba573c83Af43D40bCE227E0443CF22814d4":[210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500],"0x4faC5BE0d39fE4E3c2293Cf6Fe17Bf48cfc2C270":[224,229,234,239,244,249,254,259,264,269,274,279,284,289,294,299,304,309,314,319,324,329,334,339,344,349,354,359,364,369,374,379,384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509],"0x95343a79E7773E90137DC9157e3166a1D136814a":[232,237,242,247,252,257,262,267,272,277,282,287,292,297,302,307,312,317,322,327,332,337,342,347,352,357,362,367,372,377,382,387,392,397,402,407,412,417,422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512],"0x28960C260c55e93E6fcB86e5059C9BCb6CF86eC2":[233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513],"0x6FD04642D0C853B023F0Ad1A0b81F37AC5a0ae11":[250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500,505,510,515,520],"0x55e095Ea7fF72c8FB04259b26D29294250267e1a":[], "0xF5F9517A4913629B4A65A155dE797402a6695809":[262,267,272,277,282,287,292,297,302,307,312,317,322,327,332,337,342,347,352,357,362,367,372,377,382,387,392,397,402,407,412,417,422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,730,502,735,507,740,512,745,517,750,522,755,527,760],"0xB1E458e669807776081C8BC887eBde431B5E8344":[264,269,274,279,284,289,294,299,304,309,314,319,324,329,334,339,344,349,354,359,364,369,374,379,384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529],"0x585FEF5c0c5F6CA8c3f64D9C802931005239d33b":[283,288,293,298,303,308,313,318,323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538],"0x1e487d5ac4a2184A63FeF3a05E1F12Ec2BB6971c":[290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500,505,510,515,520,525,530,535,540],"0xEE5cdcD28461369DF740BA25aDEe64B2eC489b37":[291,296,301,306,311,316,321,326,331,336,341,346,351,356,361,366,371,376,381,386,391,396,401,406,411,416,421,426,431,436,441,446,451,456,461,466,471,476,481,486,491,496,501,506,511,516,521,526,531,536,541],"0xf5284A38b419fD964d1717AF1227e7b723892d53":[292,297,302,307,312,317,322,327,332,337,342,347,352,357,362,367,372,377,382,387,392,397,402,407,412,417,422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542],"0x6D7194A687E165274B09d6a9Db9eC048B6483997":[293,298,303,308,313,318,323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538,543],"0xC762bD3eF9477c81C2a321E93148bF2E57f74D2a":[294,299,304,309,314,319,324,329,334,339,344,349,354,359,364,369,374,379,384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529,534,539,544],"0x31b840fAd0779D02Accc9eb0657519041094bfa1":[300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500,505,510,515,520,525,530,535,540,545],"0x80de68345d134e1db3fa3f7FF4b645e3d74101E4":[301,306,311,316,321,326,331,336,341,346,351,356,361,366,371,376,381,386,391,396,401,406,411,416,421,426,431,436,441,446,451,456,461,466,471,476,481,486,491,496,501,506,511,516,521,526,531,536,541,546],"0xE8E764466F9b3f4557B466fb6445a029CD9aD0bE":[302,307,312,317,322,327,332,337,342,347,352,357,362,367,372,377,382,387,392,397,402,407,412,417,422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542,547],"0x74a1e9D869D86E13d6bC0928402ce87A1b07768f":[303,308,313,318,323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538,543,548],"0x922d1a2f0D1d3477006Ed4e76274d04498808883":[304,309,314,319,324,329,334,339,344,349,354,359,364,369,374,379,384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529,534,539,544,549],"0xdFC03E18f38eDBBfb1B00dC1f9b63736bDA4fBad":[314,319,324,329,334,339,344,349,354,359,364,369,374,379,384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529,534,539,544,549,554],"0x0E3a92Be1210836B4d8943fB307aa948DC8c1807":[322,327,332,337,342,347,352,357,362,367,372,377,382,387,392,397,402,407,412,417,422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542,547,552,557],"0x03f05CDf2f6740CB269A3af5E9BBb67A24569c7b":[323,328,333,338,343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538,543,548,553,558],"0x955f6fA8223675A84397dC780f84d70D87f811E3":[324,329,334,339,344,349,354,359,364,369,374,379,384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529,534,539,544,549,554,559],"0x368cF84A8b6E4c083dA1E5437840A799ce698ed6":[330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500,505,510,515,520,525,530,535,540,545,550,555,560],"0xD1Df52bbF3A7A3AA557CCdB6658f4b71c2bb27b8":[331,336,341,346,351,356,361,366,371,376,381,386,391,396,401,406,411,416,421,426,431,436,441,446,451,456,461,466,471,476,481,486,491,496,501,506,511,516,521,526,531,536,541,546,551,556,561],"0x4203fe06DE2bEf539aeACE4d183097198b93e1A3":[332,337,342,347,352,357,362,367,372,377,382,387,392,397,402,407,412,417,422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542,547,552,557,562],"0x93abc241E6c780A6C11560a9380174D2Ec970436":[341,346,351,356,361,366,371,376,381,386,391,396,401,406,411,416,421,426,431,436,441,446,451,456,461,466,471,476,481,486,491,496,501,506,511,516,521,526,531,536,541,546,551,556,561,566],"0xf6842e34A04a42f48251e143AF75ed475451B287":[343,348,353,358,363,368,373,378,383,388,393,398,403,408,413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538,543,548,553,558,563,568],"0xD010bbeD8d43D315a785eA865DFBc837d9191821":[352,357,362,367,372,377,382,387,392,397,402,407,412,417,422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542,547,552,557,562,567,572],"0xA080FdA810a11d320916436185D7B2ACf03CEDFD":[384,389,394,399,404,409,414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529,534,539,544,549,554,559,564,569,574,579,584,589],"0x4604f232fE66C956f66aCE60B9fFE28bD89700Ef":[413,418,423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538,543,548,553,558,563,568,573,578,583,588,593,598,603],"0x1F45CD9fbaB6D99CbF0a6B565bb6797BaD622036":[414,419,424,429,434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529,534,539,544,549,554,559,564,569,574,579,584,589,594,599,604],"0x3Baf34A87F04a8a0dFA3ebd06aA5Ea4217078576":[420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500,505,510,515,520,525,530,535,540,545,550,555,560,565,570,575,580,585,590,595,600,605],"0xe0a0AAE63ca8C529394b5205c5b324c2715C3A0D":[421,426,431,436,441,446,451,456,461,466,471,476,481,486,491,496,501,506,511,516,521,526,531,536,541,546,551,556,561,566,571,576,581,586,591,596,601,606],"0x18E07A7B2A1798Cac99a1B93A87f324bA81Cd4f0":[422,427,432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542,547,552,557,562,567,572,577,582,587,592,597,602,607],"0x7694Ac5Fb289b4a2abe1d014DeD66476CEEe2DF8":[423,428,433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538,543,548,553,558,563,568,573,578,583,588,593,598,603,608],"0x7aa5ff6358Ebe76677949BFCf899b2Bc978b99cd":[431,436,441,446,451,456,461,466,471,476,481,486,491,496,501,506,511,516,521,526,531,536,541,546,551,556,561,566,571,576,581,586,591,596,601,606,611],"0x089D27356505ed31B17a8db0402d04CfB2565ca6":[432,437,442,447,452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542,547,552,557,562,567,572,577,582,587,592,597,602,607,612],"0x49F1e2Be180a32e12FA130e9971ae405F279921c":[433,438,443,448,453,458,463,468,473,478,483,488,493,498,503,508,513,518,523,528,533,538,543,548,553,558,563,568,573,578,583,588,593,598,603,608,613],"0x7d1fC64548D3BB8A2FAC5C694C863F539c538d2A":[434,439,444,449,454,459,464,469,474,479,484,489,494,499,504,509,514,519,524,529,534,539,544,549,554,559,564,569,574,579,584,589,594,599,604,609,614],"0x33748C3218505AdcD8eFfd0dac371Fb94a644811":[452,457,462,467,472,477,482,487,492,497,502,507,512,517,522,527,532,537,542,547,552,557,562,567,572,577,582,587,592,597,602,607,612,617,622],"0x2E03CEF6D15841f0c43ceae62d496B3cF1b49bF2":[480,485,490,495,500,505,510,515,520,525,530,535,540,545,550,555,560,565,570,575,580,585,590,595,600,605,610,615,620,625,630,635],"0xE48Fb7c07118f82572CbabF15ec3Ac171DFC5Bed":[501,506,511,516,521,526,531,536,541,546,551,556,561,566,571,576,581,586,591,596,601,606,611,616,621,626,631,636,641,646],"0x24E219EBf46093dC5c5A748Cb20B8c83e86bf09d":[502,507,512,517,522,527,532,537,542,547,552,557,562,567,572,577,582,587,592,597,602,607,612,617,622,627,632,637,642,647],"0x2dD45d402aCd5667E72a6c889036769aF48c2163":[660,665,670,675,680,685,690,695,700,705,710,715,720,725],"0x849C27e3E2a05AA521d2E7285E15e8f964E88849":[661,666,671,676,681,686,691,696,701,706,711,716,721,726],"0xb4643FeACc67f835Db8f2AaFE044047df18db662":[662,667,672,677,682,687,692,697,702,707,712,717,722,727],"0x65c50794982DCAbf124832e2bE949CA7a349A4D2":[663,668,673,678,683,688,693,698,703,708,713,718,723,728],"0xC15038dBc66aA1c73DE9BBe3457c5d4F9e935733":[664,669,674,679,684,689,694,699,704,709,714,719,724,729],"0x058CEf27134BF0a3e5176C0D9BCd479208bD408A":[670,675,680,685,690,695,700,705,710,715,720,725,730],"0xb1f00A4ce3B562c7B7162f6f93972a4ABF3fCbad":[671,676,681,686,691,696,701,706,711,716,721,726,731],"0x0777b2a2D5ea41ab407eBb2aEc30566A767680C8":[672,677,682,687,692,697,702,707,712,717,722,727,732],"0xd419C8cbD20F057FCe726Eb543205fd9CFC7b55C":[673,678,683,688,693,698,703,708,713,718,723,728,733],"0x9cD9c58c342D3D4b7f7A78554098C30B9F2DC5FE":[681,686,691,696,701,706,711,716,721,726,731,736],"0x590f7796c7573fAFeD2FCF50f3dbd9Ef79FE51b1":[684,689,694,699,704,709,714,719,724,729,734,739],"0x1dADA6bf2CE25bF88308feb566ebad34bD24Cf45":[710,715,720,725,730,735,740,745,750],"0xB023D464f60004438Fb4A31014314fEBfEBF98E4":[714,719,724,729,734,739,744,749,754],"0x738173e1cDf4A4c785dc63C6987a1Fd3bBfB3Aff":[722,727,732,737,742,747,752,757],"0xB91e5D9578847bA016690C012C373282Bb025832":[731,736,741,746,751,756,761],"0x2d573d1f2578dB030ff77647cFe8FAAfcD04A35e":[742,747,752,757,762,767],"0xE20017347df47c2d43d7E9dc435003B9440E04fF":[772,777,782],"0x12307bCE1438923703C7Aa09864dD77166732b6e":[773,778,783]}

export default walletToPositions;