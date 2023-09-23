import os
import openpyxl # import das bibliotecas necessárias
import json

def exportar_para_excel(produtos): # função para exportar os dados  para um arquivo em Excel
    #cria e ativa o arquivo excel
    workbook = openpyxl.Workbook()
    sheet = workbook.active

    sheet["A1"] = "Nome"
    sheet["B1"] = "Valor" # gera o template do arquivo nas suas devidas células.
    sheet["C1"] = "Categoria"

    # itera o arquivo e insere os dados nas células a partir da linha 2, visto que já temos um cabeçalho.
    for index, produto in enumerate(produtos, start=2):
        sheet[f"A{index}"] = produto["nome"]
        sheet[f"B{index}"] = produto["valor"]
        sheet[f"C{index}"] = produto["categoria"]

    #Salva o arquivo com os dados inseridos.
    workbook.save("produtos.xlsx")
    print("Dados exportados com sucesso!")

if __name__ == "__main__":
    try:
        # Obtém o caminho do arquivo gerado pelo JS em Json, neste caso está em  Downloads.
        downloads_path = os.path.expanduser("~/Downloads")
        
        # Cria o caminho completo para o arquivo produtos.json na pasta Downloads
        json_file_path = os.path.join(downloads_path, "produtos.json")
        
       # acessa o arquivo JSON contendo os dados exportados do JS
        with open(json_file_path, 'r') as json_file:
            #carrega os dados de JSON e atribui a "produtos".
            produtos = json.load(json_file)
            #chama a função que vai exportar os produtos para ".xlsx"
            exportar_para_excel(produtos)
    except FileNotFoundError:
        print("Arquivo produtos.json não encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
