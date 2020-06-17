const priceObj = {}

async function priceInfo() {
  const fromOSMId = document.getElementById("fromOSMId-input").value;
  const fromPolygon = await getPolygon(fromOSMId)
  const toOSMId = document.getElementById("toOSMId-input").value;
  const toPolygon = await getPolygon(toOSMId)
  const price = parseInt(document.getElementById("price-input").value);

  // This section is used to add the data to the priceObj
  priceObj.fromOSMId = fromOSMId
  priceObj.fromPolygon = fromPolygon
  priceObj.toOSMId = toOSMId
  priceObj.toPolygon = toPolygon
  priceObj.price = price


  // This section is used to post the data of the priceObj to the mongodb instance
  const options = {
    method: 'POST',
    // turn our price object into json
    body: JSON.stringify(priceObj),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  await fetch('/addPriceInfo', options);
  alert("add data done")
}

document.getElementById("form-button").addEventListener('click', function() {
  priceInfo()
})

// This function is used to call nominatim, and get the polygon data from the input osmId
async function getPolygon(osmId) {
  let url = `https://nominatim.openstreetmap.org/reverse?format=json&osm_id=${osmId}&osm_type=R&polygon_geojson=1`;
  let res = await fetch(url)
  let data = await res.json()

  // This section grabs the polygon from the returned json data
  let polygon = data.geojson.coordinates

  console.log(polygon);
  console.log("Grabbed polygon successfully");
  return polygon
}
