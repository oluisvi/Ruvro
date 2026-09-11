# Clipes da landing — preparação Higgsfield

Status em 11/09/2026: referências enviadas e confirmadas; nenhuma geração iniciada. A conta selecionada está no plano free, com 10 créditos. Seedance 2.5 exige Plus; Kling 3.0 Turbo exige Basic. O trial aparece como pendente, sem gerações ilimitadas disponíveis. Não foi ativado plano, trial ou compra.

Os prompts, parâmetros, referências e erros estão em `ruvro-higgsfield-clips.json`. URLs de referência são as retornadas pelo Higgsfield, sem credenciais de upload.

## Ordem de produção

1. Detalhe: reflexão suave sobre bezel e mostrador, câmera fixa, sem movimento de ponteiros ou mudança de geometria. Referência macro recortada da imagem demonstrativa existente.
2. Hero: reflexão suave sobre caixa e pulseira, preservando a silhueta completa. A imagem inteira deve permanecer no enquadramento.

Preferência: Seedance 2.5, 4 segundos, 1080p, sem áudio; estimativa de 36 créditos por clipe. Alternativa: Kling 3.0 Turbo, 3 segundos, 720p; estimativa de 4,5 créditos por clipe. A alternativa ainda não foi submetida com sucesso. Conferir saldo e acesso antes de retomar; não repetir jobs que já tenham sido iniciados.

## Aceitação e integração

- Conferir mostrador, índices, ponteiros, coroa e elos ao longo de todo o clipe. Rejeitar deformação, letras inventadas, flash ou alteração do relógio.
- Validar enquadramentos desktop e mobile antes de exportar; o fallback Kling tem proporções diferentes das referências e pode precisar de preparação adicional.
- Manter a identificação de estudo demonstrativo, inclusive junto ao detalhe. Não apresentar a mídia como fotografia de estoque.
- Exportar MP4 H.264 sem áudio, faststart, e posters correspondentes. Ajustar compressão pelo resultado visual, com meta inicial de até 2 MB por clipe desktop e até 1 MB por versão mobile.
- Poster imediato; carregar vídeo apenas quando visível, após conteúdo essencial. Sem loop; parar no quadro final, pausar fora da viewport e quando a aba ficar oculta.
- Com reduced motion, economia de dados ou falha de reprodução: manter imagem estática. Não baixar os clipes quando reduced motion já estiver ativo.
- Não somar rotação de vídeo à transformação CSS. Manter o conteúdo e os CTAs em HTML.
- Integrar apenas arquivos realmente gerados e revisados; a página continua usando a imagem estática enquanto a produção estiver bloqueada.
