async function history() {

    const requestOptions = {
        method:"GET",
    }

    const response = await fetch("https://uhhzowkn45ga6nbhain55a7nue0leoiy.lambda-url.us-east-1.on.aws/", requestOptions)
    const resMessage = await response.json()
    console.log(resMessage)
    return resMessage
}

export default history