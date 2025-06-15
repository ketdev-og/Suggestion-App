import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SuggestionRequest, SuggestionResponse, SuggestionsData,  } from './types/Suggestion';
import { ErrorResponse } from './types/Response';
import { generateText } from './service/OpenApi';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


app.post(
  '/suggestions',
  async (req: Request<{}, {}, SuggestionRequest>, res: Response<SuggestionResponse | ErrorResponse>) : Promise<any>  => {
    const { age, goal } = req.body;

    const generatedSuggestion = await generateText(age.toString(), goal);

    let suggestions = generatedSuggestion;

    return res.json({ suggestions });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});