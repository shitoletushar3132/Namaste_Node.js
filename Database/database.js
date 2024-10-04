const MONGODBURI =
  "mongodb+srv://tusharshitole6767:%40Tshitole3132@userbook.up8qm.mongodb.net/?retryWrites=true&w=majority&appName=userbook";
const { MongoClient } = require("mongodb");

const client = new MongoClient(MONGODBURI);

const dbName = "hello";

async function main() {
  await client.connect();

  console.log("connected successfull");
  const db = client.db(dbName);
  const collection = db.collection("user");

  //   const data = {
  //     name: "Kunal Divekar",
  //     Address: "Wagholi",
  //     phone: "9699828378",
  //   };

  //   const insertResult = await collection.insertOne(data);
  //   console.log("Inserted document", insertResult);
  //   //   //read

  //   const filter = { name: "Kunal Divekar" };
  //   const updateDoc = {
  //     $set: {
  //       phone: `8767699855`,
  //     },
  //   };

  //   const updateResult = await collection.updateOne(filter, updateDoc);

  //   console.log(updateResult);

  //   const findResult = await collection.find({}).toArray();

  //   console.log("Found document =>", findResult);

  //   const countResult = await collection.countDocuments({});

  //   console.log("TOTAL COUNT", countResult);

  const result = await collection.find({ name: "Kunal Divekar" }).count();

  console.log(result);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
