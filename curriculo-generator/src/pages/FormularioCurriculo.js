import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    let currentY = 40; // Posição Y inicial na página
    const pageHeight = doc.internal.pageSize.height; // Altura da página

    // Define a cor escolhida ou preta por padrão
    const chosenColor = formData.corCurriculo || '#000000';
    const [r, g, b] = hexToRgb(chosenColor);

    // Nome do Candidato em Destaque
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(r, g, b);
    doc.text(formData.nome, marginLeft, currentY);
    currentY += 30;

    // Linha com Telefone e Email
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Telefone: ${formData.telefone} | Email: ${formData.email}`, marginLeft, currentY);
    currentY += 20;

    // Linha horizontal abaixo do título
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, currentY, 550, currentY);
    currentY += 20;

    // Seção Resumo
    currentY = renderSection(doc, 'Resumo', formData.resumo, marginLeft, currentY, r, g, b, pageHeight);

    // Linha horizontal abaixo do resumo
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, currentY, 550, currentY);
    currentY += 20;

    // Seção Experiência Profissional
    currentY = renderSection(doc, 'Experiência Profissional', formData.experiencia, marginLeft, currentY, r, g, b, pageHeight);

    // Linha horizontal abaixo da experiência
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, currentY, 550, currentY);
    currentY += 20;

    // Seção Formação Acadêmica
    currentY = renderSection(doc, 'Formação Acadêmica', formData.escolaridade, marginLeft, currentY, r, g, b, pageHeight);

    // Linha horizontal abaixo da formação
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, currentY, 550, currentY);
    currentY += 20;

    // Seção Habilidades
    currentY = renderSection(doc, 'Habilidades', formData.habilidades, marginLeft, currentY, r, g, b, pageHeight);

    // Linha horizontal abaixo das habilidades
    doc.setDrawColor(r, g, b);
    doc.line(marginLeft, currentY, 550, currentY);

    // Salvando o PDF com nome dinâmico
    doc.save(`curriculo_${formData.nome.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  const renderSection = (doc, title, content, marginLeft, currentY, r, g, b, pageHeight) => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r, g, b);
    doc.text(title, marginLeft, currentY);
    currentY += 20;
    
    // Quebra automática de texto para o conteúdo
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const splitText = doc.splitTextToSize(content || 'Nenhuma informação registrada.', 500);

    // Verifica se o conteúdo cabe na página; caso contrário, cria uma nova página
    splitText.forEach(line => {
      if (currentY + 20 > pageHeight) {
        doc.addPage();
        currentY = 40; // Reinicia o Y no topo da nova página
      }
      doc.text(line, marginLeft, currentY);
      currentY += 14; // Espaçamento entre linhas
    });

    currentY += 10; // Espaçamento adicional após o conteúdo da seção

    return currentY;
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
    ] : [0, 0, 0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experiência Profissional:</label>
            <textarea
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Habilidades:</label>
            <textarea
              name="habilidades"
              value={formData.habilidades}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Resumo Pessoal:</label>
            <textarea
              name="resumo"
              value={formData.resumo}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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
