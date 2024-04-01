const Spent = () => {
    return (
        <main className="flex flex-col mt-20">
            <section className="flex flex-col items-center justify-center">
                <span className="text-xl">Gastos neste mês</span>
                <h1 className="text-destructive text-5xl pt-2">
                    R$ -4.506<span className="text-3xl">.00</span>
                </h1>
            </section>
            <section className="px-5 mt-20">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg">Hoje</h2>
                    <h2 className="text-destructive text-lg">R$ -500.00</h2>
                </div>
                <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                        <h3>Viagem</h3>
                        <span>02:32 PM</span>
                    </div>

                    <p className="text-destructive">R$ -30</p>
                </div>
                <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                        <h3>Viagem</h3>
                        <span>02:32 PM</span>
                    </div>

                    <p className="text-destructive">R$ -30</p>
                </div>
                <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                        <h3>Viagem</h3>
                        <span>02:32 PM</span>
                    </div>
                    <p className="text-destructive">R$ -30</p>
                </div>
                <div className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                        <h3>Viagem</h3>
                        <span>02:32 PM</span>
                    </div>

                    <p className="text-destructive">R$ -30</p>
                </div>
            </section>
        </main>
    );
};

export default Spent;
