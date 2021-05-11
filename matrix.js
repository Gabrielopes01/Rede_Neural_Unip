//Uma classe com os métodos de Matrix
class Matrix{
    //Metodo Construtor que cria as matrizes
    constructor(rows, cols){
        this.rows = rows;  //Linhas
        this.cols = cols;  //Colunas

        this.data = [];  //Array Multidimensional da Rede
        
        for(let i=0; i < rows; i++){  
        //Função para armezenar um array dentro de outro, pois [[]] daria erro
            let arr = []
            for (let j=0; j<cols; j++){
                arr.push(0) //Vai inserir um valor randômico entre 0 ou 1 e multiplicar por 10
            }
            this.data.push(arr);  //Adiciona um array ao array
        }
    }

    //Funções Diversas

    //Essa função torna um Array em um Matriz, sendo o 1º o numero de linhas e 2º Colunas
    static arrayToMatrix(arr){
        let matrix = new Matrix(arr.length, 1);
        
        matrix.map((elm, i, j) => {
            return arr[i];
        });
        return matrix;
    }

    //Essa função torna uma Matriz em um Array
    static matrixToArray(obj){
        let arr = [];
        
        obj.map((elm, i, j) => {
            arr.push(elm);
        });
        return arr;
    }


    //Esta funcao exibe os valores da tabela
    print() {
        console.table(this.data);
    }


    //Esta função gera numeros aleatorios para o BIAS e para as matrizes
    randomize() {
        this.map((elm, i, j) => {
            return Math.random() * 2 - 1;
        });
    }

    //Vai mapear o array passado para acessar seus valores e realizar a função de ativação
    static map(A, func) {  //Sobrescreve a função padrao do JS, serve para array e retorna sempre um array
        let matrix = new Matrix(A.rows, A.cols)

        matrix.data = A.data.map((arr,i) => { //Acessa a matrix e divide seus elementos - Seus elementos são mais matrizes / arr = elemento
            return arr.map((num,j) => {  //Acessa os elementos dentro desse array, num = elemento e j = index do elemento
                return func(num,i,j);  //Multiplica todos os numero do array por 2
            });
        });

        return matrix;
    }

    //Vai mapear o array passado para acessar seus valores
    map(func) {  //Sobrescreve a função padrao do JS, serve para array e retorna sempre um array

        this.data = this.data.map((arr,i) => { //Acessa a matrix e divide seus elementos - 
            //Seus elementos são mais matrizes / arr = elemento
            return arr.map((num,j) => {  //Acessa os elementos dentro desse array, 
                //num = elemento e j = index do elemento
                return func(num,i,j)  
            });
        });

        return this;
    }

    //Esta função ira transpor a matriz
    static transpose(A) {
        var matrix = new Matrix(A.cols, A.rows); 
        matrix.map((num,i,j) => {
            return A.data[j][i];
        });
        return matrix;
    }

    //Esta função multiplica uma matiz por um número escalar
    static escalar_multiply(A, escalar) {  

        var matrix = new Matrix(A.rows, A.cols); 

        matrix.map((num, i, j) => {
            return A.data[i][j] * escalar;
        });   

        return matrix;
    }

    //Esta função utiliza o produto Hadamard
    static hadamard(A, B) { 

        var matrix = new Matrix(A.rows, A.cols); 

        matrix.map((num, i, j) => {
            return A.data[i][j] * B.data[i][j]
        });   //Apenas trocamos o sinal de soma para o de multiplicação

        return matrix;
    }

    //Esta função vai somar uma matrix com outa (BIAS), dois objetos - duas matrizes
    static add(A, B) {  //Estatica pode ser chama sem instanciar, ou seja, não cria o construtor

        var matrixSoma = new Matrix(A.rows, A.cols); //Gerando mais uma matrix randomica com os 
        //valores de A/m1 para recber o valor de soma do B/m2, gerando a soma da primeira parte da 
        //Rede

        //console.log(A.data);
        //console.log(B.data);
        matrixSoma.map((num, i, j) => {
            return A.data[i][j] + B.data[i][j]
        });   //Passa uma função ao map, arwo function, esta seria a soma das duas matrizes, 
        //substitui uma pela soma das duas matrizes

        return matrixSoma;
    }

    //Esta função vai subtrair uma matrix de outra
    static subtract(A, B) {

        var matrixSub = new Matrix(A.rows, A.cols); 

        matrixSub.map((num, i, j) => {
            return A.data[i][j] - B.data[i][j]
        });   

        return matrixSub;
    }


    //Esta função multiplica a o elemento do nó 1 pela soma das arestas do nó 1
    static multiply(A, B){
        var matrixMult = new Matrix(A.rows, B.cols); 
        
        matrixMult.map((num, i, j) => {
            let sum = 0;
            for(let k=0; k<A.cols; k++){
                let elm1 = A.data[i][k];
                let elm2 = B.data[k][j];
                sum += elm1 * elm2;
            }

            return sum;
        });

        return matrixMult;
    }
}