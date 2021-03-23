const mixins =  {
    validateDNS: (hostname) => {
        return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(hostname)
    }
}

module.exports = mixins