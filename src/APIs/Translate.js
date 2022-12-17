async function translate(text, source, target) {

    const requestOptions = {
        method:"POST",
        body: JSON.stringify({"text": text, "source": source, "target":target}),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const response = await fetch("https://nxkg98vclk.execute-api.us-east-1.amazonaws.com/rest/translate", requestOptions)
    const resMessage = await response.json()
    console.log(resMessage)
    return resMessage
}

export default translate