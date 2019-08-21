class Global {
    getParam() {
        //将url后面的参数 ?name=msea&sex=1  >{name:"msea",sex:1}
        var search = {};
        try {
            location.search
                .substr(1)
                .split('&')
                .forEach(function (item) {
                    var s = item.split('=');
                    search[s[0]] = s[1];
                });
        } catch (e) {
            // 抛出异常
            throw new Error(JSON.stringify(search));
        }
        return search;
    }
    setUrl(item){
        // if(!item)return;
        let path="https://res.bestcake.com/m-images/ww";
        //https://res.bestcake.com/m-images/ww/rp/可莱思迪客英国进口冰淇淋(500ml).jpg?v=636988656729729500
        if (item.SupplyNo.indexOf("KSK")!=-1){
            return path+`/jd/${item.Name}.png`
        }else if (item.SupplyNo.indexOf("NS")!=-1){
            return path+`/ns/${item.Name}.jpg`
        }else if (item.SupplyNo.indexOf("RP")!=-1){
            return path+`/rp/${item.Name}.jpg`
        }else if (item.SupplyNo.indexOf("JZ")!=-1){
            return path+`/jz/${item.Name}.png`
        }
    }

}
export default new Global();