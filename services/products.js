const cheerio = require('cheerio');
const request = require('request-promise');

const analyzeWebs = async (req,res,next) => {
    const webs = [
        {
            url: 'https://www.semana.com/noticias/lideres-sociales/112858',
            pathGeneral: '.article',
            pathLinkToPages: '.article-header .article-h a',
            pathImages: '.cover a img',
            pathPublicationDates: '.article-header .date',
            pathTitles: '.article-header .article-h a',
            pathDescriptions: '.intro'
        },
        {
            url: 'https://www.dejusticia.org/tag/lideres-sociales',
            pathGeneral: '.fl-post',
            pathLinkToPages: '.fl-post-header .fl-post-title a',
            pathImages: '.fl-post-thumb a img',
            pathPublicationDates: '.fl-post-meta .fl-post-date',
            pathTitles: '.fl-post-header .fl-post-title a',
            pathDescriptions: '.fl-post-content p'
        }
    ]
    let news = []
    for (const web of webs) {         
        let temporaryNews = await scrapingWebs(web.url, web.pathGeneral, web.pathLinkToPages, web.pathImages, web.pathPublicationDates, web.pathTitles, web.pathDescriptions)
        news = news.concat(temporaryNews)
    }    
    res.json(news)       
}

const scrapingWebs = async (url, pathGeneral, pathLinkToPages, pathImages, pathPublicationDates, pathTitles, pathDescriptions) => {
    const $ = await request({
        uri: url,
        transform: body => cheerio.load(body)        
    })

    let articles = []
    $(pathGeneral).each((i, tag) => {
        const linkToPage = $(tag).find(pathLinkToPages).attr("href")
        const image = $(tag).find(pathImages).attr("src")
        const publicationDate = $(tag).find(pathPublicationDates).text()
        const title = $(tag).find(pathTitles).text()
        const description = $(tag).find(pathDescriptions).text()

        let article = {
            linkToPage,
            image,
            publicationDate,
            title,
            description
        }

        if (url === 'https://www.semana.com/noticias/lideres-sociales/112858') {
            article.linkToPage = `https://www.semana.com${article.linkToPage}`
        }
        if (url === 'https://www.dejusticia.org/tag/lideres-sociales') {
            const monthsInLanguages = [{spanish:'enero',english:'january'},{spanish:'marzo',english:'march'},{spanish:'abril',english:'april'},{spanish:'mayo',english:'may'},{spanish:'septiembre',english:'september'},{spanish:'diciembre',english:'december'}]
            for (const months of monthsInLanguages) {         
                let dateInEnglish = article.publicationDate.replace(months.spanish,months.english)
                if (dateInEnglish.search(months.english) !== -1) {
                    article.publicationDate = dateInEnglish
                    break;
                }
            }
        }

        articles.push(article)
    })
    return articles
}

module.exports = analyzeWebs;
