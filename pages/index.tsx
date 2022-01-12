
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'



export default function Home() {
  const router = useRouter();

  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))

  }
  function idProximaPergunta() {
    if(questao){
      const proximoIndice = idsQuestoes.indexOf(questao.id) + 1 //retorna indice do id da questão atual
    return idsQuestoes[proximoIndice]

    }
    

  }
  function proximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? proximaQuestao(proximoId) : finaliza()

  }
  function proximaQuestao(proximoId:number) {
    loadQuestion(proximoId)

  }
  function finaliza() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsQuestoes.length,
        certas: respostasCertas
      }
    })

  } 
  const [idsQuestoes, setIdsQuestoes] = useState<number[]>([])
  const BASE_URL = 'http://localhost:3000/api';
  async function getIds() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsQuestoes = await resp.json();
    setIdsQuestoes(idsQuestoes)
  }

  async function loadQuestion(id: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${id}`)
    const json = await resp.json();
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao);
  }


  useEffect(() => {
    getIds()
  }, [])
  useEffect(() => {
    idsQuestoes.length > 0 && loadQuestion(idsQuestoes[0])
  }, [idsQuestoes]) //nos colchetes colocamos o que vai disparar o que está dentro das chaves. Quando alguma coisa mudar chame a função. 
  //Dependencia vazia chama a função quando o componente for inicializado
  return questao ?(
    <Questionario
      questao={questao}
      ultima={idProximaPergunta()=== undefined}
      questaoRespondida={questaoRespondida}
      proximoPasso={proximoPasso}
    />
  ) : ( false)//TO FIX - Inserir o carregando
    
}
