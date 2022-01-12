import styles from '../styles/Temporizador.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
interface TemporizadorProps {
    key: any,
    duracao: number,
    tempoEsgotado: () => void
}
export default function Temporizador(props: TemporizadorProps) {
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                duration={props.duracao}
                size={120}
                isPlaying ={true}
                onComplete={props.tempoEsgotado}
                colors={["#bce596", "#f7b801", "#ed827a", "#A30000"]}
                colorsTime={[10, 6, 3, 0]}
                
            >
                {({remainingTime})=>{
                    return remainingTime
                }}
            </CountdownCircleTimer>

        </div>

    )
}