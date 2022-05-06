class Api {
    constructor(baseCurrency = "", targetCurrency = "") {
      this.localUrl = "http://localhost:3000/users";
      this.url = `https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${targetCurrency}`;
    }
  
    async getRemote() {
      try {
        let request = await fetch(this.url);
        return await request.json();
      } catch (error) {
        throw new Error(`error is ${error}`);
      }
    }
  
    async getLocal() {
      try {
        let request = await fetch(this.localUrl);
        return await request.json();
      } catch (error) {
        throw new Error(`error is ${error}`);
      }
    }
  
    async post(paramsData) {
      try {
        let request = await fetch(this.localUrl, {
          method: "POST",
          body: JSON.stringify(paramsData),
          headers: { "content-type": "application/json" }
        });
        return await request.json();
      } catch (error) {
        throw new Error(`error is ${error}`);
      }
    }
  }