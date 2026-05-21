export default function RiskCard({
    title,
    value,
    color
  }) {
    return (
      <div className="bg-[#151515] p-6 rounded-xl border border-gray-800">
  
        <h3 className="text-gray-400 text-sm mb-3">
          {title}
        </h3>
  
        <p
          className={`text-3xl font-bold ${color}`}
        >
          {value}
        </p>
  
      </div>
    );
  }