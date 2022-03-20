import { useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (fun: React.EffectCallback) => useEffect(fun, []);

export default useMountEffect;
