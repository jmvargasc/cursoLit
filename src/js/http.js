export class Http {
  static fetchData(url) {
    return new Promise((resolve, reject) => {
      const HTTP = new XMLHttpRequest();
      HTTP.open("get", url);
      HTTP.onreadystatechange = function () {
        if (HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200) {
          const RESPONSE = JSON.parse(HTTP.responseText);
          console.log("respuesta", RESPONSE);
          for (let i = 0; i < RESPONSE.results.length; i++) {
            RESPONSE.results[i]["votos"] = 0;
          }
          resolve(RESPONSE);
        } else if (HTTP.readyState == XMLHttpRequest.DONE) {
          reject("error");
        }
      };

      HTTP.send();
    });
  }
}
