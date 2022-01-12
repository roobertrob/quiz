import QuestaoModel from "../model/questao";
import styles from '../styles/Questao.module.css';
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

const letras = [
    {valor: 'A', cor: '#f2c866'},
    {valor: 'B', cor: '#f266BA'},
    {valor: 'C', cor: '#85D4F2'},
    {valor: 'D', cor: '#BCE596'}
]
interface QuestaoProps {
    valor: QuestaoModel
    respostaFornecida: (indice:number) => void
    tempoParaResponder?: number;
    tempoEsgotado: () => void
}
export default function Questao(props: QuestaoProps) {
    const questao = props.valor;
    function renderizarRespostas() {
        return questao.respostas.map((resposta, i) => {
            return <Resposta
                key={`${questao.id}-${i}`}
                valor={resposta}
                indice={i}
                letra={letras[i].valor}
                corFundo={letras[i].cor} 
                respostaFornecida={props.respostaFornecida}/>
        })

    }
    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.enunciado} />
            <Temporizador
            key={questao.id}
            duracao={props.tempoParaResponder ?? 10}
            tempoEsgotado={props.tempoEsgotado}/>
            {renderizarRespostas()}
            

        </div>
    )
}