const form = document.getElementById("healthForm");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => { data[key] = isNaN(value) ? value : Number(value); });

            try {
                const response = await fetch("/predict", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if(result.error){
                    document.getElementById("result").innerHTML = `<p class="error">${result.error}</p>`;
                } else {
                    document.getElementById("result").innerHTML = `
                        <p><strong>ML Prediction:</strong> ${result.ml_prediction}</p>
                        <p><strong>Final Risk:</strong> ${result.final_risk}</p>
                        <p><strong>Explanation:</strong> ${result.explanation.join(", ")}</p>
                    `;
                }
            } catch (err) {
                document.getElementById("result").innerHTML = `<p class="error">Error: ${err}</p>`;
            }
        });