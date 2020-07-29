const React = require('react')
const serialize = require('serialize-javascript')
const Script = require('../helpers/script')

const Vip = (props) =>{
const serializeProps = {itemData:props.itemData}

console.log(props.itemData.item)
 return(<div>
        <Script>
        {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
          isJSON: true
        })};`}
      </Script>
     <h2>{props.itemData.item.title}</h2>
     <img src={props.itemData.item.picture}></img>
 </div>
 )}
module.exports = Vip;