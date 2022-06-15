const puppeteer = require("puppeteer");

const codeObj = require('./code')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'abs842380@gmail.com'
const password = 'Taimur123'



let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})

let page

browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 })
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, { delay: 50 })
    return passwordIsEntered
}).then(function () {
    let loginButtonClick = page.click("button[data-analytics='LoginPassword']", { delay: 50 })
    return loginButtonClick
}).then(function () {
    let clickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1='algorithms']", page, { delay: 50 })
    return clickOnAlgoPromise
}).then(function () {
    let getToWarmUp = waitAndClick("input[value='warmup']", page)
    return getToWarmUp
}).then(function () {
    let waitFor3Second = page.waitFor(3000)
    return waitFor3Second
}).then(function () {
    let allChallengesPromice = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 50 })
    return allChallengesPromice;
}).then(function (questionArr) {
    console.log("number of questions", questionArr.length)
    let questionWillBeSolved = questionSolver(page, questionArr[0] , codeObj.answers[0])
    return questionWillBeSolved
})






function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromice = cPage.waitForSelector(selector)
        waitForModelPromice.then(function () {
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}


function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function () {
            let EditorInFocusPromice = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromice
        }).then(function () {
            return waitAndClick('.checkbox-input', page)
        }).then(function () {
            return page.waitForSelector('textarea.custominput', page)
        }).then(function () {
            return page.type('textarea.custominput', answer, { delay: 15 })
        }).then(function(){
            let CtrlIsPressed = page.keyboard.down('Control')
            return CtrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A' , {delay: 100})
            return AIsPressed
    }).then(function(){
        let XIsPressed = page.keyboard.press('X' , {delay: 100})
        return XIsPressed
        }).then(function(){
            let CtrlIsUnPressed = page.keyboard.up('Control')
            return CtrlIsUnPressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs' , page)
   return mainEditorInFocus
        }).then(function(){
            let CtrlIsPressed = page.keyboard.down('Control')
            return CtrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A' , {delay: 100})
            return AIsPressed
        }).then(function(){
            let VIsPressed = page.keyboard.press('V' , {delay: 100})
            return VIsPressed
        }).then(function(){
            let CtrlIsUnPressed = page.keyboard.up('Control')
            return CtrlIsUnPressed
        }).then(function(){
          return page.click('.hr-monaco-submit' , {delay:50})
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })

})
    }
