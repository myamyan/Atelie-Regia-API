import { inserircadastrousuario, loginCliente, verificarEmailExistente,  CadastroPedido,  ConsultaPedido, ConsultaProduto, ConsultaPorNome, FiltroPorCategoria, FiltroPorTamanho, FiltroPorTecido, FiltroPorCor, FiltroPorDesigner, FiltroPorPromocao, FiltroPorDestaque, FiltroPorDisponivel, CadastroInformacoesPessoais, CadastroInfoEntrega, ItensPedido, CadastrarFavorito, ConsultarFavoritos, CadastroFinalCompra, UpdateFinalCompraPedido, UpdateFinalCompraProduto, UpdateFinalCompraEntrega, alterarEndereco, ConsultarEnderecosPedido  } from '../Repository/UserRepository.js'; 

import { Router } from "express";

const server = Router();

server.post('/user/cadastro/usuario', async (req, resp) => {
    try {
      const usuarioParaCadastrar = req.body;
  
      const usuarioCadastrado = await inserircadastrousuario(usuarioParaCadastrar);
  
      resp.send(usuarioCadastrado);
    } catch (err) {
      console.error('Erro na função de cadastro de usuário:', err);
      resp.status(400).send({
        erro: err.message
      });
    }
  });

  server.post('/user/login/cliente', async (req, resp) => {
    try {
      const loginparainserir = req.body;
  
      const emailExistente = await verificarEmailExistente(loginparainserir.email);
  
      if (emailExistente) {
    
        const logininserida = await inserircadastrousuario(loginparainserir);
        resp.send(logininserida);
      } else {
        
        throw new Error('Este email não está cadastrado.');
      }
  
    } catch (err) {
      resp.status(400).send({
        erro: err.message
      });
    }
  });
  
  server.get('/user/login/email/:email', async (req, resp) => {
    try {
      const { email } = req.params;
  
      if (!email) {
        resp.status(400).send({ erro: 'O parâmetro email é obrigatório' });
        return;
      }
  
      const resposta = await buscaremail(email);
  
      if (!resposta) {
        resp.status(404).send({ erro: 'Email não encontrado' });
        return;
      }
  
      resp.send(resposta);
    } catch (err) {
      console.error('Erro na função emaillogin:', err);
      resp.status(500).send({ erro: 'Ocorreu um erro ao processar a requisição.' });
    }
  });


  server.post('/user/cadastro/finalizacao', async (req, resp) => {
    try {
      const informacoesParaCompletar = req.body;
  
      const informacoesCompletas = await CadastroInformacoesPessoais(informacoesParaCompletar);
  
      resp.send(informacoesCompletas);
    } catch (err) {
      console.error('Erro na função de cadastro de informações:', err);
      resp.status(400).send({
        erro: err.message
      });
    }
  });


  server.post('/user/cadastro/pedido', async (req, resp) => {

    try {


        const pedidoParaCadastrar = req.body;

        const pedidoCadastrado = await CadastroPedido(pedidoParaCadastrar);

        resp.send(pedidoCadastrado);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});



server.get('/user/consulta/pedido', async (req, resp) => {

  try {

      const { id } = req.query;

      const pedidoporid = await ConsultaPedido(id);

      resp.send(pedidoporid);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})



server.get('/user/lista/busca', async (req, resp) => {

  try {

      const listaprodutos = await ConsultaProduto();

      resp.send(listaprodutos);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})


server.get('/user/filtro/nome-produto', async (req, resp) => {

  try {

      const { nome } = req.query;

      const produtopornome = await ConsultaPorNome(nome);

      resp.send(produtopornome);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})


server.get('/user/filtro/categoria', async (req, resp) => {

  try {

      const { id } = req.query;

      const produtoporcategoria = await FiltroPorCategoria(id);

      resp.send(produtoporcategoria);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})


server.get('/user/filtro/tecido', async (req, resp) => {

  try {

      const { id } = req.query;

      const produtoportecido = await FiltroPorTecido(id);

      resp.send(produtoportecido);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})



server.get('/user/filtro/designer', async (req, resp) => {

  try {

      const { id } = req.query;

      const produtopordesigner = await FiltroPorDesigner(id);

      resp.send(produtopordesigner);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})




server.get('/user/filtro/cor', async (req, resp) => {

  try {

      const { id } = req.query;

      const produtoporcor = await FiltroPorCor(id);

      resp.send(produtoporcor);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})

server.get('/user/filtro/tamanho', async (req, resp) => {

  try {

      const { id } = req.query;

      const produtoportamanho = await FiltroPorTamanho(id);

      resp.send(produtoportamanho);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})


// server.get('/user/filtro/valor', async (req, resp) => {

//     try {

//         const { valor } = req.query;

//         const produtoporvalor = await FiltroPorValor( valor );

//         resp.send(produtoporvalor);


//     } catch (err) {
//         resp.status(400).send({
//             erro: err.message
//         })
//     }
// })




server.get('/user/filtro/promocao', async (req, resp) => {

  try {

      const { promocao } = req.query;

      const produtoporpromocao = await FiltroPorPromocao(promocao);

      resp.send(produtoporpromocao);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})


server.get('/user/filtro/destaque', async (req, resp) => {

  try {

      const { destaque } = req.query;

      const produtopordestaque = await FiltroPorDestaque(destaque);

      resp.send(produtopordestaque);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})


server.get('/user/filtro/disponivel', async (req, resp) => {

  try {

      const { disponivel } = req.query;

      const produtopordisponivel = await FiltroPorDisponivel(disponivel);

      resp.send(produtopordisponivel);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})


server.post('/user/cadastro/informacoes-entrega', async (req, resp) => {
  try {
    const infoParaCadastrar = req.body;

    const infoCadastrada = await CadastroInfoEntrega(infoParaCadastrar);

    resp.send(infoCadastrada);
  } catch (err) {
    console.error('Erro na função de cadastro de usuário:', err);
    resp.status(400).send({
      erro: err.message
    });
  }
});


server.post('/user/cadastro-final', async(req, resp) =>{

  try {

    const infoFinalParaCadastrar = req.body;

    const infoFinalCadastrada = await CadastroFinalCompra(infoFinalParaCadastrar);

    resp.send(infoFinalCadastrada);
    
  } catch (err) {
    resp.status(400).send({
    erro: err.message
  });
  }

});


server.put('/user/cadastro-final/update/pedido/:id', async(req,resp) =>{

try {

  const { id } = req.params;
  const idF = req.body;

  const resposta = await UpdateFinalCompraPedido( id, idF );

  resp.status(204).send()

} catch (err) {
  
  resp.status(400).send({

    erro: err.message

  });

}

})

server.put('/user/cadastro-final/update/produto/:id', async(req,resp) =>{

  try {
  
    const { id } = req.params;
    const idF = req.body;
  
    const resposta = await UpdateFinalCompraProduto( id, idF );
  
    resp.status(204).send()
  
  } catch (err) {
    
    resp.status(400).send({
  
      erro: err.message
  
    });
  
  }
  
  })

  server.put('/user/cadastro-final/update/entrega/:id', async(req,resp) =>{

    try {
    
      const { id } = req.params;
      const idF = req.body;
    
      const resposta = await UpdateFinalCompraEntrega( id, idF );

      
      if (!endereco.endereco)
      throw new Error('O campo é obrigatório ');

      if (!endereco.cep)
      throw new Error('O campo é obrigatório ');

      if (!endereco.complemento)
      throw new Error('O campo é obrigatório ');

      if (!endereco.numres)
      throw new Error('O campo é obrigatório ');
    
      resp.status(204).send()
    
    } catch (err) {
      
      resp.status(400).send({
    
        erro: err.message
    
      });
    
    }
    
    })


server.get('/user/consulta/itens-pedido', async (req, resp) => {

  try {

      const { id } = req.query;

      const itenspedido = await ItensPedido(id);

      resp.send(itenspedido);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})

server.get('/user/consulta/enderecos', async (req, resp) => {

  try {

      const { id } = req.query;

      const enderecoscliente = await ConsultarEnderecosPedido(id);

      resp.send(enderecoscliente);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})



server.post('/user/cadastro/lista-favoritos', async (req, resp) => {
  try {
    const favoritoParaCadastrar = req.body;

    const favoritoCadastrado = await CadastrarFavorito(favoritoParaCadastrar);

    resp.send(favoritoCadastrado);
  } catch (err) {
    console.error('Opss! Houve um erro ao adicionar este produto a sua lista de favoritos, tente novamente', err);
    resp.status(400).send({
      erro: err.message
    });
  }
});


server.get('/user/consulta/lista-favoritos', async (req, resp) => {

  try {

      const { id } = req.query;

      const listafavoritos = await ConsultarFavoritos(id);

      resp.send(listafavoritos);

  } catch (err) {
      resp.status(400).send({
          erro: err.message
      })
  }
})

server.put('user/alterar/endereco/:id', async (req, resp) => {
    try {
       
        const { id } = req.params;
        const endereco = req.body;

        if (!endereco.endereco)
        throw new Error('O campo é obrigatório ');

        if (!endereco.cep)
        throw new Error('O campo é obrigatório ');

        if (!endereco.complemento)
        throw new Error('O campo é obrigatório ');

        if (!endereco.numres)
        throw new Error('O campo é obrigatório ');

        if (!endereco.id)
        throw new Error('Usuário não logado');

        const resposta = await alterarEndereco(id, endereco);

        if (resposta != 1)
            throw new Error('Não pode ser alterado.');
        else
            resp.status(204).send();

    } catch (err) {
        console.error('Erro durante a alteração', err);
        resp.status(400).send({
            erro: err.message
        })
    }


})


export default server;
