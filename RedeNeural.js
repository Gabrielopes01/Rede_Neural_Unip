//Esta classe cria a rede neural e define a entrada, o oculto e a saída
//Função que transforma todo o numero em um numero entre 0 e 1
function sigmoid(x) {
    return 1/(1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

//Uma classe com metodos da Rede Neural
class RedeNeural {  
    //Constroi os BIAS e os Pesos
    constructor(i_nodes, h_nodes, o_nodes){
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matrix(this.h_nodes,1); //Uma coluna de Nós
        this.bias_ih.randomize();  //Gera valores aleatorios a matrix
        this.bias_ho = new Matrix(this.o_nodes,1); //Uma coluna de Nós
        this.bias_ho.randomize();

        //this.bias_ih.print();  //Exibe os BIAS da entrada ao oculto
        //this.bias_ho.print();  //Exibe o BIAS do oculto a saida


        //Criando os pesos/arestas da Rede, cada linha equivale ao nós seguintes
        //e cada coluna equivale aos pesos
        this.weights_ih = new Matrix(this.h_nodes, this.i_nodes);  
        this.weights_ih.randomize();

        this.weights_ho = new Matrix(this.o_nodes, this.h_nodes);
        this.weights_ho.randomize();

        this.learning_rate = 0.1;  //10% de Aprendizado

    }


    train(arr,target) {
        //FEEDFORWARD
        //INPUT -> HIDDEN
        
        let input = Matrix.arrayToMatrix(arr);  //Criando a Matrix para o FF
        //Criando os nos ocultos
        let hidden = Matrix.multiply(this.weights_ih, input);  
        //Multiplica os pesos pelo input (Nos de entrada) para gerar o Nos Ocultos
        //console.log(hidden)
        //Adicionando o BIAS
        hidden = Matrix.add(hidden, this.bias_ih);  //Adiciona o BIAS a multiplicação do No Oculto
        
        //Criando a função de ativação da Sigmoid
        hidden.map(sigmoid);

        //HIDEEN -> OUTPUT
        // d(Sigmoid) = Output * (1- Output)
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        //output.print();

        //BACKPROPAGTION

        // OUTPUT -> HIDDEN
        let expected = Matrix.arrayToMatrix(target); 
        let output_error = Matrix.subtract(expected,output);  //Formando a matriz de erros da saída
        let d_output = Matrix.map(output,dsigmoid);
        let hidden_T = Matrix.transpose(hidden);  //Transposição da matriz oculta

        let gradient = Matrix.hadamard(d_output,output_error);  //Produto Hadmart
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate);   
        //Multiplicando o Hadamart pelo Learning Rate

        //Ajustando Bias
        this.bias_ho = Matrix.add(this.bias_ho,gradient);
        //Ajustando Pesos
        let weights_ho_deltas = Matrix.multiply(gradient,hidden_T);
        this.weights_ho = Matrix.add(this.weights_ho,weights_ho_deltas);  //Corrigindo os pesos


        //HIDDEN -> OUTPUT
        let weigths_ho_T = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multiply(weigths_ho_T,output_error);  
        //Multiplica os pesos transpostos da oculta pelos erros da saída
        let d_hidden = Matrix.map(hidden,dsigmoid);
        let input_T = Matrix.transpose(input);

        let gradient_H = Matrix.hadamard(d_hidden, hidden_error);
        gradient_H = Matrix.escalar_multiply(gradient_H,this.learning_rate);

        //Ajustando Bias
        this.bias_ih = Matrix.add(this.bias_ih,gradient_H);
        //Ajustando Pesos
        let weights_ih_deltas = Matrix.multiply(gradient_H,input_T);
        this.weights_ih = Matrix.add(this.weights_ih, weights_ih_deltas);

    }

    //Este método fara o processo de FeedForward após o Backpropagation para tentar predizer o resultado
    predict(arr) {
        //INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(arr);  

        let hidden = Matrix.multiply(this.weights_ih, input);  
        hidden = Matrix.add(hidden, this.bias_ih); 
        
        //Criando a função de ativação da Sigmoid
        hidden.map(sigmoid);

        //HIDEEN -> OUTPUT
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);
        output = Matrix.matrixToArray(output);

        return output;
    }
}