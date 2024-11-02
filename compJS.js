function compileCode() {
    var input = document.getElementById('input-code').value;
    var output = document.getElementById('output');
    output.innerHTML = '';
  
    try {
      var script = document.createElement('script');
  
      script.onload = function() {
        var consoleOutput = [];
        var originalConsoleLog = console.log;
  
        console.log = function(...args) {
          args.forEach(function(value) {
            consoleOutput.push(encodeURIComponent(String(value)));
          });
          originalConsoleLog(...args);
        };
  
        var customEval = eval; 
  
        
        eval = function(code) {
          try {
            return customEval(code);
          } catch (error) {
            output.innerHTML += 'Erro de execução: ' + error.message + '<br><br>'; 
          }
        };
  
        
        if (input.includes('Date')) {
         
          var dateScript = document.createElement('script');
          dateScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.23.0/index.umd.js';
          document.body.appendChild(dateScript);
        }
  
        function meuMap(arr, callback) {
          const novoArray = [];
          for (let i = 0; i < arr.length; i++) {
           novoArray.push(callback(arr[i], i, arr));
    }
    return novoArray;
  }
  
      function meuFilter(arr, callback) {
      const novoArray = [];
      for (let i = 0; i < arr.length; i++) {
          if (callback(arr[i], i, arr)) {
          novoArray.push(arr[i]);
      }
    }
    return novoArray;
  }
  
  function meuReduce(arr, callback, valorInicial) {
    let acumulador = valorInicial !== undefined ? valorInicial : arr[0];
    const inicio = valorInicial !== undefined ? 0 : 1;
  
    for (let i = inicio; i < arr.length; i++) {
      acumulador = callback(acumulador, arr[i], i, arr);
    }
  
    return acumulador;
  }
  
        
        var transformedInput = Babel.transform(input, { presets: ['env'] }).code;
  
        
        transformedInput = transformedInput.replace(/\bvar\b/g, 'let');
  
        eval(transformedInput);
  
        console.log = originalConsoleLog;
  
        output.innerHTML += 'Resultado:';
      };
  
      document.body.appendChild(script);
      script.textContent = `
        try {
          var output = document.getElementById('output'); // Adicionado para referenciar o elemento output
  
          var ConsoleLog = function(...args) {
            args.forEach(function(value) {
              if (typeof value === 'string') {
                // Utiliza o método decodeURIComponent() para exibir os caracteres especiais corretamente
                output.innerHTML += decodeURIComponent(value);
              } else {
                output.innerHTML += JSON.stringify(value);
              }
              output.innerHTML += '<br>'; // Adiciona quebra de linha após cada console.log
            });
          };
  
          // Redefine a função console.log para utilizar ConsoleLog
          console.log = ConsoleLog;
  
          ${input}
  
          // Exemplo de uso da função generateTruthTable
          /*
          var variables = ['A', 'B', 'C'];
          var truthTable = generateTruthTable(variables);
          console.log('Tabela Verdade:');
          console.log(variables.join('\t|\t'));
          console.log('------------------------');
          truthTable.forEach(function(row) {
            console.log(row.join('\t|\t'));
          });
          */
        } catch (error) {
          output.innerHTML += 'Erro de execução: ' + error.message + '<br><br>'; // Adiciona quebra de linha após o erro
        }
      `;
    } catch (error) {
      output.innerHTML += 'Erro de execução: ' + error.message + '<br><br>'; // Adiciona quebra de linha após o erro
    }
  }