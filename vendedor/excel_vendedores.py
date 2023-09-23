import os
import openpyxl 
import json

def exportar_para_excel(vendedores): 
    
    workbook = openpyxl.Workbook()
    sheet = workbook.active

    sheet["A1"] = "Nome"
    sheet["B1"] = "Matricula" 
    

    for index, vendedor in enumerate(vendedores, start=2):
        sheet[f"A{index}"] = vendedor["nome"]
        sheet[f"B{index}"] = vendedor["matricula"]

    workbook.save("vendedores.xlsx")
    print("Dados exportados com sucesso!")

if __name__ == "__main__":
    try:
        downloads_path = os.path.expanduser("~/Downloads")
        
        json_file_path = os.path.join(downloads_path, "vendedores.json")
        
        with open(json_file_path, 'r') as json_file:
            vendedores = json.load(json_file)
            exportar_para_excel(vendedores)
    except FileNotFoundError:
        print("Arquivo produtos.json não encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
