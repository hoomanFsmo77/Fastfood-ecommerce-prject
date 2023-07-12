

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