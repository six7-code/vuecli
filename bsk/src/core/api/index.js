import request from "./http"
import mock from  "@/mock"

class Apis {
    //获取首页数据
    // json1811.ashx?v=1562741893374&c=NewIndexController&m=index
    getIndexData() {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1562741438965",
                "c": "NewIndexController",
                "m": "index"
            }
        });
    }
    getNsCakeCenter(){
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1563249470561",
                "c": "NsCakeCenter",
                "m": "GetJdListNew"
            }
        });
    }
    getGoodsData(params){
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params
        });
    }
    edit(data){
        return mock.post("/edit",{data})
    }
    login(data){
        return mock.get("/login",{params:data})
    }


}
export default new Apis();