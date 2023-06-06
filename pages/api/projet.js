// Librairies
import { connectDatabase } from '@/helpers/mongodb';

export default async function handler(req, res) {
  const { titre, slug, client, annee, description, contenu } =
    req.body;

  // Vérification des données
  if (
    !titre ||
    !slug ||
    !client ||
    !annee ||
    !description ||
    !contenu
  ) {
    res.status(422).json({
      message: 'Veuillez remplir tous les champs du formulaire !',
    });
    return;
  }

  // Stocker le nouveau projet dans la base de données
  const nouveauProjet = {
    titre,
    slug,
    client,
    annee,
    description,
    contenu,
    dateDePublication: new Date(),
  };

  // Connection à MongoDB
  let clientMongoDB;

  try {
    clientMongoDB = await connectDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Connection à MongoDB impossible !' });
    return;
  }

  const db = clientMongoDB.db();

  // Envoi du nouveau projet dans la base de données
  try {
    await db.collection('projets').insertOne(nouveauProjet);
  } catch (error) {
    clientMongoDB.close();
    res.status(500).json({ message: 'Envoi du projet impossible !' });
    return;
  }

  // Fermeture de la connection à MongoDB
  clientMongoDB.close();
  res.status(201).json({
    message: 'Le projet a bien été ajouté !',
    projet: nouveauProjet,
  });
}
