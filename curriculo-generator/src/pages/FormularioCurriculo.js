import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Para criar tabelas organizadas no PDF

const FormularioCurriculo = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    escolaridade: '',
    experiencia: '',
    habilidades: '',
    resumo: '',
    corCurriculo: '#000000' // Cor padrão preta
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF('portrait', 'pt', 'a4');
    const marginLeft = 40;
    const marginTop = 40;
    
    // Define a cor escolhida ou preta por padrão
    const chosenColor = formData.corCurriculo || '#000000';
    const [r, g, b] = hexToRgb(chosenColor);

    // Nome do Candidato em Destaque
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(r, g, b); // Aplicando a cor escolhida
    doc.text(formData.nome, marginLeft, marginTop);

    // Linha com Telefone e Email
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Preto para o texto
    doc.setFont('helvetica', 'normal');
    doc.text(`Telefone: ${formData.telefone} | Email: ${formData.email}`, marginLeft, marginTop + 20);

    // Linha horizontal abaixo do título
    doc.setDrawColor(r, g, b); // Cor da linha
    doc.line(marginLeft, marginTop + 30, 550, marginTop + 30);

    // Seção Resumo
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r, g, b); // Cor para o título
    doc.text('Resumo', marginLeft, marginTop + 50);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(formData.resumo || 'Nenhum resumo fornecido.', marginLeft, marginTop + 70, { maxWidth: 500 });

    // Linha horizontal abaixo do resumo
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, marginTop + 90, 550, marginTop + 90);

    // Seção Experiência Profissional
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r, g, b);
    doc.text('Experiência Profissional', marginLeft, marginTop + 110);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(formData.experiencia || 'Nenhuma experiência registrada.', marginLeft, marginTop + 130, { maxWidth: 500 });

    // Linha horizontal abaixo da experiência
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, marginTop + 150, 550, marginTop + 150);

    // Seção Formação Acadêmica
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r, g, b);
    doc.text('Formação Acadêmica', marginLeft, marginTop + 170);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(formData.escolaridade || 'Nenhuma formação registrada.', marginLeft, marginTop + 190, { maxWidth: 500 });

    // Linha horizontal abaixo da formação
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, marginTop + 210, 550, marginTop + 210);

    // Seção Habilidades
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r, g, b);
    doc.text('Habilidades', marginLeft, marginTop + 230);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(formData.habilidades || 'Nenhuma habilidade registrada.', marginLeft, marginTop + 250, { maxWidth: 500 });

    // Linha horizontal abaixo das habilidades
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, marginTop + 270, 550, marginTop + 270);

    // Salvando o PDF com nome dinâmico
    doc.save(`curriculo_${formData.nome.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  // Função para converter HEX em RGB
  const hexToRgb = (hex) => {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0]; // Se não conseguir converter, retorna preto
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro para Criação de Currículo</h1>
        <p className="mb-4 text-gray-600">
          Preencha o formulário abaixo com suas informações pessoais e profissionais para gerar um currículo em PDF. 
          Lembre-se de fornecer detalhes precisos, especialmente nas seções de <strong>experiência profissional</strong> e <strong>habilidades</strong>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">Digite seu nome completo como gostaria que aparecesse no currículo.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">Digite um email válido para contato.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone:</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">Informe um número de telefone para contato.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nível de Escolaridade:</label>
            <select
              name="escolaridade"
              value={formData.escolaridade}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Selecione...</option>
              <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
              <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
              <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
              <option value="Ensino Médio Completo">Ensino Médio Completo</option>
              <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
              <option value="Ensino Superior Completo">Ensino Superior Completo</option>
              <option value="Pós-Graduação">Pós-Graduação</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Doutorado">Doutorado</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Escolha o seu nível de escolaridade mais recente.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experiência Profissional:</label>
            <textarea
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">Descreva suas experiências profissionais mais relevantes.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Habilidades:</label>
            <textarea
              name="habilidades"
              value={formData.habilidades}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">Liste suas principais habilidades e conhecimentos.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Resumo Pessoal:</label>
            <textarea
              name="resumo"
              value={formData.resumo}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">Escreva um breve resumo sobre você, destacando suas qualificações e objetivos.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cor do Currículo:</label>
            <input
              type="color"
              name="corCurriculo"
              value={formData.corCurriculo}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">Escolha a cor predominante para o currículo.</p>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Gerar Currículo em PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioCurriculo;
