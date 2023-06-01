// Librairie: mongodb
// Description: Librairie de connexion à la base de données MongoDB
import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  // connection à MongoDB
  const client = await MongoClient.connect(
    'mongodb+srv://JSL_Code:Lucalexia5653*@cluster0.zqphdhc.mongodb.net/portfolio?retryWrites=true&w=majority'
  );

  return client;
}
