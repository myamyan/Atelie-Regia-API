

import { inserirLoginadm, verificarEmailExistente, CadastrarProduto, AlterarProduto, DeletarProduto, cadastrarImagem, BuscarTodosPedidos, BuscarPedidosConcluidos, BuscarPedidosAndamento, FiltroPorMaisCaro, FiltroPorMaisBarato, ConsultaGeralProdutosAdm, ConsultaPorNomeAdm, FiltroPorCategoriaAdm, FiltroPorTecidoAdm, FiltroPorDesignerAdm, FiltroPorCorAdm, FiltroPorTamanhoAdm, FiltroPorValorAdm, FiltroPorPromocaoAdm, FiltroPorDestaqueAdm, FiltroPorDisponivelAdm, inserircategorias, inserirtecidos, inserirdesigner, inserircores, inserirtamanho, AssociarCategoriaProduto, AssociarTamanhoProduto, AssociarCorProduto, AssociarTecidosProduto, DesassociarCategoriaProduto, ExcluirImagem, DesassociarTamanhoProduto, DesassociarCoresProduto, DesassociarTecidosProduto, ConsultarImagem, ExcluirPedido, AssociarImagemProduto, SelectCategorias, SelectTecidos, SelectDesigner, SelectCores } from '../Repository/AdmRepository.js';

import multer from 'multer';
import { Router } from "express"

const server = Router();
const upload = multer({ dest: 'storage/imagensprodutos' });


server.post('/adm/login', async (req, resp) => {
    try {
        const loginparainserir = req.body;

        const emailExistente = await verificarEmailExistente(loginparainserir.email);

        if (emailExistente) {

            const logininserida = await inserirLoginadm(loginparainserir);
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

server.get('/adm/login/email/:email', async (req, resp) => {
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


server.post('/adm/inserirloginadm', async (req, resp) => {
    try {
        const loginadmparainserir = req.body;

        const emailinserido = await inserirLoginadm(loginadmparainserir.email);

        const loginadminserido = [];
        loginadminserido.push(loginadmparainserir);

        resp.send(loginadminserido);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});





server.post('/adm/cadastro/produto', async (req, resp) => {

    try {


        const produtoParaCadastrar = req.body;

        const produtoCadastrado = await CadastrarProduto(produtoParaCadastrar);

        resp.send(produtoCadastrado);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});



server.put('/adm/produto/alterar/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const produto = req.body;


        const resposta = await AlterarProduto(  id, produto );

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})



server.delete('/adm/produto/deletar/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await DeletarProduto(id);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.post('/adm/cadastro/categoria', async (req, resp) => {

    try {


        const categoriaParaCadastrar = req.body;

        const categoriaCadastrada = await inserircategorias(categoriaParaCadastrar);

        resp.send(categoriaCadastrada);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.post('/adm/cadastro/tecidos', async (req, resp) => {

    try {


        const tecidoParaCadastrar = req.body;

        const tecidoCadastrado = await inserirtecidos(tecidoParaCadastrar);

        resp.send(tecidoCadastrado);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.post('/adm/cadastro/designer', async (req, resp) => {

    try {


        const designerParaCadastrar = req.body;

        const designerCadastrado = await inserirdesigner(designerParaCadastrar);

        resp.send(designerCadastrado);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.post('/adm/cadastro/cores', async (req, resp) => {

    try {


        const corParaCadastrar = req.body;

        const corCadastrada = await inserircores(corParaCadastrar);

        resp.send(corCadastrada);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.post('/adm/cadastro/tamanho', async (req, resp) => {

    try {


        const tamanhoParaCadastrar = req.body;

        const tamanhoCadastrado = await inserirtamanho(tamanhoParaCadastrar);

        resp.send(tamanhoCadastrado);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});





server.post('/adm/cadastro/produto/imagem', upload.single('imagem'), async (req, resp) => {

    try {

        const imagem = req.file.path;

        const resposta = await cadastrarImagem(imagem);

        if (resposta != 1)
            throw new Error('A imagem não pode ser salva.');

        resp.status(204).send();

    } catch (err) {

        resp.status(400).send({

            erro: err.message

        })

    }
}
)


server.post('/adm/associacao/imagem-produto', async (req, resp) => {

    try {


        const imagemParaAssociar = req.body;

        const imagemAssociada = await AssociarImagemProduto(imagemParaAssociar);

        resp.send(imagemAssociada);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});



server.post('/adm/associacao/categoria-produto', async (req, resp) => {

    try {


        const categoriaParaAssociar = req.body;

        const categoriaAssociada = await AssociarCategoriaProduto(categoriaParaAssociar);

        resp.send(categoriaAssociada);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.post('/adm/associacao/tamanho-produto', async (req, resp) => {

    try {


        const tamanhoParaAssociar = req.body;

        const tamanhoAssociado = await AssociarTamanhoProduto(tamanhoParaAssociar);

        resp.send(tamanhoAssociado);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});



server.post('/adm/associacao/cor-produto', async (req, resp) => {

    try {


        const corParaAssociar = req.body;

        const corAssociada = await AssociarCorProduto(corParaAssociar);

        resp.send(corAssociada);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});



server.post('/adm/associacao/tecidos-produto', async (req, resp) => {

    try {


        const tecidosParaAssociar = req.body;

        const tecidoAssociado = await AssociarTecidosProduto(tecidosParaAssociar);

        resp.send(tecidoAssociado);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


server.get('/adm/consulta/pedidos', async (req, resp) => {

    try {

        const listapedidos = await BuscarTodosPedidos();

        resp.send(listapedidos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/consulta/pedidos-em-andamento', async (req, resp) => {

    try {

        const listaemandamento = await BuscarPedidosAndamento();

        resp.send(listaemandamento);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/consulta/pedidos-concluidos', async (req, resp) => {

    try {

        const listaconcluidos = await BuscarPedidosConcluidos();

        resp.send(listaconcluidos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


// server.get('/adm/consulta/pedidos-mais-novos', async (req, resp) => {

//     try {

//         const listanovos = await FiltroPorMaisNovo();

//         resp.send(listanovos);

//     } catch (err) {
//         resp.status(400).send({
//             erro: err.message
//         })
//     }
// })


// server.get('/adm/consulta/pedidos-mais-antigos', async (req, resp) => {

//     try {

//         const listaantigos = await FiltroPorMaisAntigo();

//         resp.send(listaantigos);

//     } catch (err) {
//         resp.status(400).send({
//             erro: err.message
//         })
//     }
// })


server.get('/adm/consulta/produtos-caros', async (req, resp) => {

    try {

        const listacaros = await FiltroPorMaisCaro();

        resp.send(listacaros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.get('/adm/consulta/produtos-baratos', async (req, resp) => {

    try {

        const listabaratos = await FiltroPorMaisBarato();

        resp.send(listabaratos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/consulta/produtos', async (req, resp) => {

    try {

        const listaprodutos = await ConsultaGeralProdutosAdm();

        resp.send(listaprodutos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/adm/filtro/nome', async (req, resp) => {

    try {

        const { nome } = req.query;

        const produtopornome = await ConsultaPorNomeAdm(nome);

        resp.send(produtopornome);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/filtro/categoria', async (req, resp) => {

    try {

        const { categoria } = req.query;

        const produtoporcategoria = await FiltroPorCategoriaAdm(categoria);

        resp.send(produtoporcategoria);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/filtro/tecido', async (req, resp) => {

    try {

        const { tecido } = req.query;

        const produtoportecido = await FiltroPorTecidoAdm(tecido);

        resp.send(produtoportecido);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.get('/adm/filtro/designer', async (req, resp) => {

    try {

        const { designer } = req.query;

        const produtopordesigner = await FiltroPorDesignerAdm(designer);

        resp.send(produtopordesigner);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




server.get('/adm/filtro/cor', async (req, resp) => {

    try {

        const { cor } = req.query;

        const produtoporcor = await FiltroPorCorAdm(cor);

        resp.send(produtoporcor);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/adm/filtro/tamanho', async (req, resp) => {

    try {

        const { tamanho } = req.query;

        const produtoportamanho = await FiltroPorTamanhoAdm(tamanho);

        resp.send(produtoportamanho);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/filtro/valor', async (req, resp) => {

    try {

        const { valor } = req.query;

        const produtoporvalor = await FiltroPorValorAdm(valor);

        resp.send(produtoporvalor);


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




server.get('/adm/filtro/promocao', async (req, resp) => {

    try {

        const { promocao } = req.query;

        const produtoporpromocao = await FiltroPorPromocaoAdm(promocao);

        resp.send(produtoporpromocao);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/filtro/destaque', async (req, resp) => {

    try {

        const { destaque } = req.query;

        const produtopordestaque = await FiltroPorDestaqueAdm(destaque);

        resp.send(produtopordestaque);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/filtro/disponivel', async (req, resp) => {

    try {

        const { disponivel } = req.query;

        const produtopordisponivel = await FiltroPorDisponivelAdm(disponivel);

        resp.send(produtopordisponivel);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.delete('/adm/deletar/imagem/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await ExcluirImagem(id);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.delete('/adm/desassociacao/categoria-produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await DesassociarCategoriaProduto(id);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.delete('/adm/desassociacao/tamanho-produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await DesassociarTamanhoProduto(id);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




server.delete('/adm/desassociacao/cor-produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await DesassociarCoresProduto(id);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.delete('/adm/desassociacao/tecido-produto/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await DesassociarTecidosProduto(id);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.get('/adm/busca/imagem', async (req, resp) => {

    try {

        const { id } = req.query;

        const imagemproduto = await ConsultarImagem(id);

        resp.send(imagemproduto);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.delete('/adm/deletar/pedido/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await ExcluirPedido(id);

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/select/categorias', async (req, resp) => {

    try {

        const listacategorias = await SelectCategorias();

        resp.send(listacategorias);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/select/tecidos', async (req, resp) => {

    try {

        const listatecidos = await SelectTecidos();

        resp.send(listatecidos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/select/designer', async (req, resp) => {

    try {

        const listadesigner = await SelectDesigner();

        resp.send(listadesigner);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.get('/adm/select/cores', async (req, resp) => {

    try {

        const listacores = await SelectCores();

        resp.send(listacores);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;