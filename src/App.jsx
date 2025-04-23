import { useState, useEffect } from 'react'
import './App.css'

const menu = {
  'Segunda': {
    cafeDaManha: 'Pão integral + Ovo mexido + Uma fruta',
    almoco: 'Frango grelhado + Arroz integral + Salada',
    lancheDaTarde: 'Uma fruta + Castanhas',
    jantar: 'Frango grelhado + Arroz integral + Salada',
  },
  'Terça': {
    cafeDaManha: 'Iogurte com aveia + Frutas picadas',
    almoco: 'Carne moída com abobrinha + Purê de batata doce + Couve',
    lancheDaTarde: 'Iogurte com mel e chia',
    jantar: 'Carne moída com abobrinha + Purê de batata doce + Couve',
  },
  'Quarta': {
    cafeDaManha: 'Tapioca com queijo branco + Chá',
    almoco: 'Tilápia grelhada + Arroz com lentilha + Salada verde',
    lancheDaTarde: 'Pão integral com pasta de frango',
    jantar: 'Tilápia grelhada + Arroz com lentilha + Salada verde',
  },
  'Quinta': {
    cafeDaManha: 'Pão integral + Ovo mexido + Uma fruta',
    almoco: 'Bife em tiras com legumes + Arroz integral + Salada',
    lancheDaTarde: 'Uma fruta + Castanhas',
    jantar: 'Bife em tiras com legumes + Arroz integral + Salada',
  },
  'Sexta': {
    cafeDaManha: 'Iogurte com aveia + Frutas picadas',
    almoco: 'Omelete de forno com legumes + Arroz integral + Brócolis',
    lancheDaTarde: 'Iogurte com mel e chia',
    jantar: 'Omelete de forno com legumes + Arroz integral + Brócolis',
  },
  'Sábado': {
    cafeDaManha: 'Tapioca com bife em tiras + Café',
    almoco: 'Salmão assado + Purê de mandioquinha + Espinafre',
    lancheDaTarde: 'Uma fruta + Castanhas',
    jantar: 'Salmão assado + Purê de mandioquinha + Espinafre',
  },
  'Domingo': {
    cafeDaManha: 'Pão integral + Ovo mexido + Uma fruta',
    almoco: 'Livre (repetir o prato preferido da semana)',
    lancheDaTarde: 'Iogurte com mel e chia',
    jantar: 'Livre (repetir o prato preferido da semana)',
  }
};

// Função para formatar os itens do cardápio em lista
const formatMenuItems = (menuText) => {
  return menuText.split('+').map(item => item.trim());
};

function App() {
  const [currentMeal, setCurrentMeal] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [menuData, setMenuData] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  // Efeito para atualizar o horário a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Determina a refeição atual com base no horário
      const hour = now.getHours();
      
      if (hour >= 6 && hour < 10) {
        setCurrentMeal('cafeDaManha');
      } else if (hour >= 10 && hour < 14) {
        setCurrentMeal('almoco');
      } else if (hour >= 14 && hour < 18) {
        setCurrentMeal('lancheDaTarde');
      } else {
        setCurrentMeal('jantar');
      }
      
      // Atualiza o dia atual
      const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const dayName = dayNames[now.getDay()];
      setCurrentDay(dayName);
      
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer); // Limpa o timer quando o componente é desmontado
  }, []);

  useEffect(() => {
    // Dados do cardápio
    setMenuData(menu);

    // Configuração inicial
    const now = new Date();
    setCurrentTime(now);
    
    // Atualiza o dia atual
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayName = dayNames[now.getDay()];
    setCurrentDay(dayName);

    // Determina a refeição atual com base no horário
    const hour = now.getHours();
    
    if (hour >= 6 && hour < 10) {
      setCurrentMeal('cafeDaManha');
    } else if (hour >= 10 && hour < 14) {
      setCurrentMeal('almoco');
    } else if (hour >= 14 && hour < 18) {
      setCurrentMeal('lancheDaTarde');
    } else {
      setCurrentMeal('jantar');
    }
  }, []);

  // Função para obter o título da refeição
  const getMealTitle = (mealType) => {
    switch (mealType) {
      case 'cafeDaManha':
        return 'Café da manhã';
      case 'almoco':
        return 'Almoço';
      case 'lancheDaTarde':
        return 'Lanche da tarde';
      case 'jantar':
        return 'Jantar';
      default:
        return '';
    }
  };

  // Renderiza os itens do menu como uma lista
  const renderMenuItems = (menuText) => {
    const items = formatMenuItems(menuText);
    return (
      <ul className="menu-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  // Formata a hora atual
  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="container">
      <h1 className="title">Cardápio Semanal</h1>
      
      <div className="day-info">
        Hoje é {currentDay} - {formatTime(currentTime)}h
      </div>

      {currentDay && currentMeal && menuData[currentDay] && (
        <div className="current-meal">
          <h2>{getMealTitle(currentMeal)}</h2>
          {renderMenuItems(menuData[currentDay][currentMeal])}
        </div>
      )}

      <div className="meal-grid">
        <div className="meal-card">
          <h3>Café da Manhã</h3>
          {currentDay && menuData[currentDay] && (
            renderMenuItems(menuData[currentDay].cafeDaManha)
          )}
        </div>

        <div className="meal-card">
          <h3>Almoço</h3>
          {currentDay && menuData[currentDay] && (
            renderMenuItems(menuData[currentDay].almoco)
          )}
        </div>

        <div className="meal-card">
          <h3>Lanche da Tarde</h3>
          {currentDay && menuData[currentDay] && (
            renderMenuItems(menuData[currentDay].lancheDaTarde)
          )}
        </div>

        <div className="meal-card">
          <h3>Jantar</h3>
          {currentDay && menuData[currentDay] && (
            renderMenuItems(menuData[currentDay].jantar)
          )}
        </div>
      </div>
    </div>
  )
}

export default App
