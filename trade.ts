import  dotenv  from "dotenv";
import { KiteConnect } from "kiteconnect";

dotenv.config()

const apiKey = "g0ktldpgge3zshez";
let access_token = "rFZOA8u6ZRppcTr396OCbl2SFDwTYepu";




const kc = new KiteConnect({ api_key: apiKey });

export async function placeOrder(tradingsymbol : string , quantity : number , order_type : "BUY" | "SELL") {
    try {
        kc.setAccessToken(access_token)
        await kc.placeOrder("regular" , {
        exchange: "NSE",
        tradingsymbol:tradingsymbol,
        transaction_type:order_type,
        quantity:quantity,
        product:"CNC",
        order_type:"MARKET",

    });

    }catch (err) {
        console.log(err)
    }
}




export async function getProfile() {
  try {
    const profile = await kc.getProfile()
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}

