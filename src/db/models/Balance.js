import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema({

    currentBalance:{
        type: Number,
        default: 0,
        min: [0, "Bakiye negatif durumunda"]
    },
    creditLimit:{
        type: Number,
        required: [true, "Kredi limiti zorunludur"],
        min: [0, "Kredi limiti negatif olamaz"],
        default:5000
    },
    availableCredit:{
        type: Number,
    default:function(){
        return this.creditLimit + this.currentBlance;
    }    },
    currency: {
        type: String,
        default:"TRY",
        enum: ["TRY", "USD", "EURO"]
    },
    status:{
        type: String,
        default: "aktif",
        enum: ["aktif","donduruldu","kapalı"]
    },
    creditCardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"CreditCard",
        required:[true, "kredi kartı id zorunludur"],
        unique: true
    },
    lastUpdated:{
        type: Date,
        default: Date.now
    }
},{    timestamps:true

});

const Balance = mongoose.model("Balance", balanceSchema);
export default Balance;
