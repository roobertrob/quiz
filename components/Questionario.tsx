import QuestaoModel from "../model/questao";
import styles from '../styles/Questionario.module.css'
import Botao from "./Botao";
import Questao from "./Questao";
interface QuestionarioProps {
    questao: QuestaoModel,
    ultima: boolean,
    questaoRespondida: (questao: QuestaoModel) => void
    proximoPasso: () => void
}
export default function Questionario(props: QuestionarioProps) {
    function respostaFornecida(indice:number) {
        if(!props.questao.respondida){
            props.questaoRespondida(props.questao.responder(indice))
        }
        
    }
    return ( 
        <div className={styles.questionario}>
            {props.questao ?
            <Questao
            valor={props.questao}
            tempoParaResponder={8}
            respostaFornecida={respostaFornecida}
            tempoEsgotado={props.proximoPasso}
            />
            : false
            } 
        
        <Botao 
        onClick={props.proximoPasso}
        texto={props.ultima? 'Finalizar' : 'Proxima'}
        />

        </div>
    )
}