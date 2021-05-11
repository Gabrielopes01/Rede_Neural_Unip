//Este arquivo é o arquivo JS principal que será rodado no index e iniciara a Rede Neural  
var train = true;
var generation = 0;

function setup() {   //O Setup é responsávle por rodar uma parte de código 

    //var m1 = new Matrix(1,2);  //Gera uma matrix de matrizes de 3X3
    //var m2 = new Matrix(2,1);  //Segunda matriz, que seria uma segunda entrada (Nó)

    //console.log(m1); //Criando Matriz Random
    //Matrix.add(m1,m2);
    //console.log(Matrix.multiply(m1,m2).data);

    nn = new RedeNeural(2,5,1);  //Neuronios

    //XOR Problem
    dataset = {
        inputs:
            [[1,1],
            [1,0],
            [0,1],
            [0,0]],
        outputs:
            [[0],
            [1],
            [1],
            [0]]
    }   

}


function draw() {  //Executa o comando a seguir a cada segundo
    if (train) {
        generation += 1;
        for (var i = 0; i < 10000; i++) {
            var index = floor(random(4));
            nn.train(dataset.inputs[index], dataset.outputs[index]);
        }
        console.log('Geração:' + generation + ' Bits Iguais:' + nn.predict([0, 0])[0] + ' Bits Diferentes:' + nn.predict([1, 0])[0]);
        if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98) {
            train = false;
            console.log("Terminou");
            //console.log(round(nn.predict([1, 0])))
        }
    }
}

//Logo após iniciar a página, rode em seu console os teste com o seguinte comando -> nn.predict([0,0])