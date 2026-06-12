import { mockPlantaIdentificada, mockPlantaIdentificadaSalva, mockPlantaNaoIdentificada } from '../mocks/PlantaIdentificada';

const identificarPlantaPorFoto = jest.fn()
const salvarPlanta = jest.fn()

describe('api e identificação', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('identificar planta por foto', () => {
        it('deve retornar o nome cientifico da planta', async () => {
            identificarPlantaPorFoto.mockResolvedValue(mockPlantaIdentificada)

            const resultado = await identificarPlantaPorFoto('string_da_foto')

            expect(identificarPlantaPorFoto).toHaveBeenCalledWith('string_da_foto')
            expect(resultado).toHaveProperty('scientific_name', 'Monstera deliciosa')
        })

        it('deve lançar erro se a foto estiver corrompida', async () => {
            identificarPlantaPorFoto.mockRejectedValue(new Error('imagem invalida'));

            await expect(identificarPlantaPorFoto('')).rejects.toThrow('imagem invalida');
        });
    });

    describe('salvando identificação',() => {
        it('simula o registro da identificação', async () => {
            salvarPlanta.mockResolvedValue(mockPlantaIdentificadaSalva)

            const novaIdentificacao = await salvarPlanta('Monstera deliciosa')

            expect(salvarPlanta).toHaveBeenCalled()
            expect(novaIdentificacao).toHaveProperty('id', 'planta0101')
            expect(novaIdentificacao.uid_usuario).toBe('user_aryelle')
        })
    })

})
    