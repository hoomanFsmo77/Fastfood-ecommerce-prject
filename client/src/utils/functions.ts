import {IResponse} from "~/utils/types";


export const urlEncodeBody=(obj:object)=>{
    const changeToArray=Object.entries(obj)
    const urlEncode=new URLSearchParams()
    changeToArray.forEach(item=>{
        urlEncode.append(item[0],item[1])
    })
    return urlEncode
}

export const formDataBody=(obj:object)=>{
    const changeToArray=Object.entries(obj)
    const form=new FormData()
    changeToArray.forEach(item=>{
        form.append(item[0],item[1])
    })
    return form
}
export const handleIconClick = (node:any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

export const serializeError=(errors:IResponse<any>['errors'])=>{
    if(errors){
        return typeof errors==='string' ? [errors] :errors.map(error=>{
            return `${error.type} ${error.path}: ${error.msg}`
        })
    }

}
export const calculate_off_price=(price:number,off_percent:number)=>{
    const off=Number(((price*off_percent)/100).toFixed(0))
    return price-off
}