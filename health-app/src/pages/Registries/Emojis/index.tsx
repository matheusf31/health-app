import React from 'react';

import HappyColor from '../../../assets/feels/happy-color.svg';
import Happy from '../../../assets/feels/happy.svg';
import AngryColor from '../../../assets/feels/angry-color.svg';
import Angry from '../../../assets/feels/angry.svg';
import VeryHappyColor from '../../../assets/feels/very-happy-color.svg';
import VeryHappy from '../../../assets/feels/very-happy.svg';
import SadColor from '../../../assets/feels/sad-color.svg';
import Sad from '../../../assets/feels/sad.svg';
import VerySadColor from '../../../assets/feels/very-sad-color.svg';
import VerySad from '../../../assets/feels/very-sad.svg';
import NeutralColor from '../../../assets/feels/neutral-color.svg';
import Neutral from '../../../assets/feels/neutral.svg';

import { EmojiContainer } from './styles';

interface IEmojisProps {
  selectedFeels: string;
  onSelectedFeelsChange: React.Dispatch<React.SetStateAction<string>>;
}

const Emojis: React.FC<IEmojisProps> = ({
  selectedFeels,
  onSelectedFeelsChange,
}) => {
  return (
    <EmojiContainer>
      {selectedFeels === 'angry' ? (
        <AngryColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('angry')}
        />
      ) : (
        <Angry
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('angry')}
        />
      )}

      {selectedFeels === 'very-sad' ? (
        <VerySadColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-sad')}
        />
      ) : (
        <VerySad
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-sad')}
        />
      )}

      {selectedFeels === 'sad' ? (
        <SadColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('sad')}
        />
      ) : (
        <Sad
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('sad')}
        />
      )}

      {selectedFeels === 'neutral' ? (
        <NeutralColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('neutral')}
        />
      ) : (
        <Neutral
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('neutral')}
        />
      )}

      {selectedFeels === 'happy' ? (
        <HappyColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('happy')}
        />
      ) : (
        <Happy
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('happy')}
        />
      )}

      {selectedFeels === 'very-happy' ? (
        <VeryHappyColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-happy')}
        />
      ) : (
        <VeryHappy
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-happy')}
        />
      )}
    </EmojiContainer>
  );
};

export default Emojis;
