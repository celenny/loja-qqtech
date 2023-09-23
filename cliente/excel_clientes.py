import os
import openpyxl 
import json

def exportar_para_excel(clientes): 
    
    workbook = openpyxl.Workbook()
    sheet = workbook.active

    sheet["A1"] = "Nome"
    sheet["B1"] = "Data Nasc" 
    sheet["C1"] = "CPF"
    sheet["D1"] = "Origem"
    sheet["E1"] = "Score"

    for index, cliente in enumerate(clientes, start=2):
        sheet[f"A{index}"] = cliente["nome"]
        sheet[f"B{index}"] = cliente["dataNasc"]
        sheet[f"C{index}"] = cliente["cpf"]
        sheet[f"D{index}"] = cliente["origem"]
        sheet[f"E{index}"] = cliente["score"]

    workbook.save("clientes.xlsx")
    print("Dados exportados com sucesso!")

if __name__ == "__main__":
    try:
        downloads_path = os.path.expanduser("~/Downloads")
        
        json_file_path = os.path.join(downloads_path, "clientes.json")
        
        with open(json_file_path, 'r') as json_file:
            clientes = json.load(json_file)
            exportar_para_excel(clientes)
    except FileNotFoundError:
        print("Arquivo produtos.json não encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
