export const TooltipFormatter = (params) => {
  const name = params[0]?.name;
  const color = params[0].color;
  const value = params[0].value ;
  const marker = `<span style="display: inline-block; border-radius: 50%; height: 0.5rem; width: 0.5rem; background:${color}"></span>`;

  return `<div style="width: 3rem; height: 1.875rem;">
                <strong>${name}</strong> <br/>${marker} ${value < 100 ? value : `${value}k`}
            </div>`;
};
