const baseUrl: ValueObject = {
    login:'http://api.core.titan.shenzhouxing.com',//线上
    bet:'http://api.quiz.titan.shenzhouxing.com',//线上
    store:'http://api.app.titan.shenzhouxing.com/',//线上
    upload:'http://api.upload.titan.shenzhouxing.com',//线上
}

interface ValueObject {
    readonly login: string;
    readonly bet: string;
    readonly store: string;
    readonly upload: string;
}

export default baseUrl

