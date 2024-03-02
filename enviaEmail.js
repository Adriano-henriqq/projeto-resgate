
async function enviaEmail(transporter,dados, res) {
    try {
        const dadosConscritos = dados;
        const promises = []
        for (let dado in dadosConscritos) {

            const nome = dadosConscritos[dado].nome
            const email = dadosConscritos[dado].email
            
            if(!email) {
                console.log(`Email vazio, para o nome ${nome} pulando para o proximo email`)
            }
            let dadosEmail = {
                from: `seu email`,
                to: email,
                subject: 'assunto do email',
                html: `<h1>Olá ${nome}</h1> 
                <p>sua mensagem.</p>`,
                
            }
            
               
                const emailPromise = new Promise((resolve, reject) => {
                    transporter.sendMail(dadosEmail, (error, info) => {
                        if (error) {
                            reject(`Erro no envio para ${email}: ${error}`);
                        } else {
                            console.log(`Email enviado para: ${email} - ${info.response}`);
                            resolve(`Email enviado com sucesso para: ${nome} com o Email: ${email}`);
                        }
                    });
                });

                promises.push(emailPromise)
            
            
        }
        try{
            const resultados = await Promise.all(promises);
            return resultados;     
          }catch(error){
              console.log(`erro no envio para ${email}` , error);
          }
    } catch (error) {
        console.error('erro no envio ', error);
    }
}
// let filaDeEmails = []
//  function enviaEmailDelay(transporter, res){
//     if(filaDeEmails.length > 0){
//         const proximoEmail = filaDeEmails.shift()
        
//         enviaEmail(transporter,proximoEmail,res).then(()=>{
//             setTimeout(enviaEmailDelay,1000)
//         })
//     }
    
    
//  }
module.exports = {
    enviaEmail,
    // enviaEmailDelay,
    // filaDeEmails
}
