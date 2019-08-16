import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SimonGame from './SimonGame';
import { SimonColor } from './SimonColor';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { exec } from 'child_process';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SimonGame />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('Logic', () => {

    let wrapper;
    let instance;
    let simonSaysSpy;
    let beginLevelSpy;
    let getRandomColorSpy;

    beforeEach(() => {
        wrapper = shallow(<SimonGame />);
        instance = wrapper.instance();

        instance.state = {
            ...instance.state,
            interval: 1
        }

        const mockColors = [SimonColor.RED, SimonColor.BLUE];
        getRandomColorSpy = jest.spyOn(instance, "getRandomColor").mockImplementation(() => {
            return mockColors.shift();
        });
    });

    afterEach(() => {
        if (simonSaysSpy) {
            simonSaysSpy.mockRestore();
        }
        if (beginLevelSpy) {
            beginLevelSpy.mockRestore();
        }
        if (getRandomColorSpy) {
            getRandomColorSpy.mockRestore();
        }
    });

    it('should has a title in state', () => {
        expect(instance.state.title).toBe("Simon Game");
    });

    it('should has a isPlayerTerm in state', () => {
        expect(instance.state.isPlayerTerm).toBe(false);
    });

    it('should has a activeButton in state', () => {
        expect(instance.state.activeButton).toBe("");
    });

    it('should has a interval in state', () => {
        expect(instance.state.interval).toBe(1);
    });

    it('should has a level in state', () => {
        expect(instance.state.level).toBe(0);
    });

    it('should has a says array in state', () => {
        expect(instance.state.says).toEqual([]);
    });

    it('should have four colors', () => {
        expect(SimonColor.RED).toBe("RED");
        expect(SimonColor.BLUE).toBe("BLUE");
        expect(SimonColor.GREEN).toBe("GREEN");
        expect(SimonColor.YELLOW).toBe("YELLOW");
    });


    it("should add 'RED' to the says array when call simonSay()", () => {
        instance.simonSays();
        expect(instance.state.says).toEqual([SimonColor.RED]);
    });

    it("should clear the says array after calling beginLevel", (done) => {
        instance.state = {
            ...instance.state,
            says: [SimonColor.RED]
        };
        simonSaysSpy = jest.spyOn(instance, 'simonSays').mockImplementation(() => { });
        instance.beginLevel(1).subscribe((idx) => { }, () => { }, () => {
            expect(instance.state.says).toEqual([]);
            done();
        });
    });

    it("should wait for the last say from player at level 2", (done) => {
        instance.state = {
            ...instance.state,
            says: [SimonColor.RED, SimonColor.BLUE]
        };
        instance.beginLevel(2).subscribe((idx) => { }, () => { }, () => {
            beginLevelSpy = jest.spyOn(instance, 'beginLevel').mockImplementation(() => { });
            instance.playerSays(SimonColor.RED);
            expect(beginLevelSpy).not.toHaveBeenCalled();
            done();
        });

    });

    it("should go to the level 2 when play say the correct sequence", (done) => {
        instance.beginLevel(1).subscribe((idx) => { }, () => { }, () => {
            beginLevelSpy = jest.spyOn(instance, 'beginLevel').mockImplementation(() => { });
            instance.playerSays(SimonColor.RED);
            expect(beginLevelSpy).toHaveBeenCalledWith(2);
            done();
        });

    });

    it("should go to the back to level 1 when play say the wrong sequence", (done) => {
        instance.state = {
            ...instance.state,
            says: [SimonColor.RED]
        };
        instance.beginLevel(1).subscribe((idx) => { }, () => { }, () => {
            beginLevelSpy = jest.spyOn(instance, 'beginLevel').mockImplementation(() => { });
            instance.playerSays(SimonColor.BLUE);
            expect(beginLevelSpy).toHaveBeenCalledWith(1);
            done();
        });

    });


    it("should add 'RED', BLUE' to the says array when call simonSay() 2 times", () => {
        var mockColors = [SimonColor.RED, SimonColor.BLUE];
        jest.spyOn(instance, "getRandomColor").mockImplementation(() => {
            return mockColors.shift();
        });
        instance.simonSays();
        instance.simonSays();
        expect(instance.state.says).toEqual([SimonColor.RED, SimonColor.BLUE]);
    });

    it("should trigger simonSays() 1 time after calling beginLevel(1)", () => {
        simonSaysSpy = jest.spyOn(instance, 'simonSays').mockImplementation(() => { });
        const s = instance.beginLevel(1).subscribe((idx) => { }, () => { }, () => {
            expect(simonSaysSpy).toHaveBeenCalledTimes(1);
            s.unsubscribe();
        })
    });

    it("should trigger simonSays() 2 time after calling beginLevel(2)", () => {
        simonSaysSpy = jest.spyOn(instance, 'simonSays').mockImplementation(() => {
        });
        const s = instance.beginLevel(2).subscribe((idx) => { }, () => { }, () => {
            expect(simonSaysSpy).toHaveBeenCalledTimes(2);
            s.unsubscribe();
        })
    });

    it('should call generateColor to get a random color', () => {
        var mockColors = [SimonColor.RED, SimonColor.BLUE];
        jest.spyOn(instance, "getRandomColor").mockImplementation(() => {
            return mockColors.shift();
        });
        expect(instance.generateColor()).toBe(SimonColor.RED);
    });

    it('should call generateColor to get 2 random colors', () => {
        var mockColors = [SimonColor.RED, SimonColor.BLUE];
        jest.spyOn(instance, "getRandomColor").mockImplementation(() => {
            return mockColors.shift();
        });
        expect(instance.generateColor()).toBe(SimonColor.RED);
        expect(instance.generateColor()).toBe(SimonColor.BLUE);
    });

    it('should add color "RED" after calling simonSays once', () => {
        var mockColors = [SimonColor.RED, SimonColor.BLUE];
        jest.spyOn(instance, "getRandomColor").mockImplementation(() => {
            return mockColors.shift();
        });
        expect(instance.generateColor()).toBe(SimonColor.RED);
        expect(instance.generateColor()).toBe(SimonColor.BLUE);
    });

});

describe('UI', () => {

    let wrapper;
    let instance;
    let simonSaysSpy;
    let beginLevelSpy;
    let playerSaysStub;

    beforeEach(() => {
        wrapper = shallow(<SimonGame />);
        instance = wrapper.instance();

        instance.state = {
            ...instance.state,
            interval: 1
        }
    });

    afterEach(() => {
        if (simonSaysSpy) {
            simonSaysSpy.mockRestore();
        }
        if (beginLevelSpy) {
            beginLevelSpy.mockRestore();
        }
        if (playerSaysStub) {
            playerSaysStub.mockRestore();
        }
    });

    it('should has a title "Simon Game"', () => {
        expect(wrapper.find("h1").text()).toBe("Simon Game");
    });

    it('should has a GameBoard', () => {
        expect(wrapper.find("div.simon-board").length).toBe(1);
    });

    it('should has a red pad button', () => {
        expect(wrapper.find("div.simon-board").find("div.pad-button.red").length).toBe(1);
    });

    it('should has a blue pad button', () => {
        expect(wrapper.find("div.simon-board").find("div.pad-button.blue").length).toBe(1);
    });

    it('should has a green pad button', () => {
        expect(wrapper.find("div.simon-board").find("div.pad-button.green").length).toBe(1);
    });

    it('should has a blue pad button', () => {
        expect(wrapper.find("div.simon-board").find("div.pad-button.blue").length).toBe(1);
    });

    it('should has a container', () => {
        expect(wrapper.find("div.container").length).toBe(1);
    });

    it('should has a start button', () => {
        expect(wrapper.find("button.start").length).toBe(1);
    });

    it('should trigger beginLevel(1) when click the start button', () => {
        beginLevelSpy = jest.spyOn(instance, 'beginLevel').mockImplementation(() => { });
        wrapper.find('button.start').simulate('click');
        expect(beginLevelSpy).toHaveBeenCalledWith(1);
    });

    it('should trigger playerSay("RED") when click the red button', () => {
        playerSaysStub = jest.spyOn(instance, 'playerSays').mockImplementation(() => { });
        wrapper.find('div.pad-button.red').simulate('click');
        expect(playerSaysStub).toHaveBeenCalledWith(SimonColor.RED);
    });

    it('should trigger playerSay("BLUE") when click the red button', () => {
        playerSaysStub = jest.spyOn(instance, 'playerSays').mockImplementation(() => { });
        wrapper.find('div.pad-button.blue').simulate('click');
        expect(playerSaysStub).toHaveBeenCalledWith(SimonColor.BLUE);
    });

    it('should trigger playerSay("GREEN") when click the red button', () => {
        playerSaysStub = jest.spyOn(instance, 'playerSays').mockImplementation(() => { });
        wrapper.find('div.pad-button.green').simulate('click');
        expect(playerSaysStub).toHaveBeenCalledWith(SimonColor.GREEN);
    });

    it('should trigger playerSay("YELLOW") when click the red button', () => {
        playerSaysStub = jest.spyOn(instance, 'playerSays').mockImplementation(() => { });
        wrapper.find('div.pad-button.yellow').simulate('click');
        expect(playerSaysStub).toHaveBeenCalledWith(SimonColor.YELLOW);
    });

    it('should add class "active" to red button when state.activeButton="RED"', (done) => {
        expect(wrapper.find('div.pad-button.red.active').length).toBe(0);
        instance.setState({
            ...instance.state,
            says: [SimonColor.RED],
            activeButton: SimonColor.RED
        }, () => {
            expect(wrapper.find('div.pad-button.red.active').length).toBe(1)
            done();
        }); 
    });

});


