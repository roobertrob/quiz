import Link from 'next/link'
import styles from '../styles/Botao.module.css'
interface ButtonProps {
    href?: string
    texto: string
    onClick?: (e: any) => void

}
export default function Botao(props: ButtonProps) {
    function renderizarBotao() {
        return (
            <button className={styles.botao}
                onClick={props.onClick}
            >
                {props.texto}

            </button>
        )
    }
    return props.href ? (
        <Link href={props.href}>
            {renderizarBotao()}

        </Link>
    ) : renderizarBotao()

}