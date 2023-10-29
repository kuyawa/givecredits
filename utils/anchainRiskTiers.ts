import * as constants from '../constants'

interface RiskTier {
    scoreMin: number;
    scoreMax: number;
    risk: 'low' | 'medium' | 'elevated' | 'high';
    description: string;
}

const anchainRiskTiers: RiskTier[] = [
    { scoreMin: 1, scoreMax: 30, risk: 'low', description: constants.ANCHAIN_RESPONSE_LOWRISK },
    { scoreMin: 31, scoreMax: 50, risk: 'medium', description: constants.ANCHAIN_RESPONSE_MEDIUMRISK },
    { scoreMin: 51, scoreMax: 80, risk: 'elevated', description: constants.ANCHAIN_RESPONSE_ELEVATEDRISK },
    { scoreMin: 81, scoreMax: 100, risk: 'high', description: constants.ANCHAIN_RESPONSE_HIGHRISK },
];

export default anchainRiskTiers;