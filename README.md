# login_regist

# Användarhantering, Inloggning och Registrering samt Hantering av Jobblista med REST API

Denna webbtjänst erbjuder fullständig funktionalitet för hantering av användare, inklusive inloggning och registrering, samt hantering av en jobblista genom ett REST API

## Tekniker

- **Frontend:** HTML, CSS och JavaScript används för användargränssnittet.
- **Backend:** Node.js och Express.js för API-funktioner och databasoperationer.
- **Databas:** MongoDB för lagring av användaruppgifter och CV-data.
- **Säkerhet:** Hashade lösenord och JWT-token för autentisering och dataskydd.

## Funktioner

1. **Registrering och Inloggning:**
   - Användare kan registrera sig med användarnamn, e-post och lösenord.
   - Inloggning med autentisering och generering av JWT-token.

2. **jobblist-Hantering:**
   - Lägga till, visa och ta bort jobb-uppgifter.
   - Data valideras och sparas i databasen för varje användare.

3. **Säkerhet och Skydd:**
   - Hashning av lösenord för säker lagring.
   - JWT-token för autentisering och skyddad åtkomst till resurser.

## Installation och Användning

Denna webbtjänst använder MongoDB som databaslösning för att lagra användaruppgifter för Inloggning och Registrering. För att ansluta till din databas behöver du lagra inloggningsuppgifterna som miljövariabler hos din valda webbhotstjänst

* scheman användes med Mongoose för att definiera rätt struktur och validering för data:
```node.js
// user schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("User", userSchema);
```

```node.js
// connect to mongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATEBASE || config.DB_URI,).then(() => {
    console.log("connected to MongoDb...");
}).catch((error) => {
    console.log("error connecting to database..." + error);
});
```
## API-Rutter

- Registrering: `POST /api/signup`
- Inloggning: `POST /api/login`
- Lägga till jobb: `POST /api/workexperience`
- Visa jobb: `GET /api/workexperience`
- Ta bort jobb: `DELETE /api/workexperience/:ID`

## Utvecklare

- [Länk till webbplatsen](https://main--imaginative-donut-12d8e3.netlify.app/index.html)

