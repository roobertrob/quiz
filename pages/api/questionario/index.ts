import embaralha from "../../../functions/embaralha";
import questoes from "../bancoDeQuestoes";
import bancoDeQuestoes from "../bancoDeQuestoes";

export default function questionario(req, res) {
    
  const ids = (questoes.map(questao=>questao.id));
  res.status(200).json(embaralha(ids))

};
